import React, { useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { Title } from "../components/basics"

// ---------------------------------------------------------------------------
// Pure helpers (safe to run during SSR — no browser globals)
// ---------------------------------------------------------------------------

// Natural sort so frame-2 comes before frame-10.
function naturalCompare(a, b) {
  const ax = []
  const bx = []
  a.replace(/(\d+)|(\D+)/g, (m, $1, $2) => {
    ax.push([$1 || Infinity, $2 || ""])
  })
  b.replace(/(\d+)|(\D+)/g, (m, $1, $2) => {
    bx.push([$1 || Infinity, $2 || ""])
  })
  while (ax.length && bx.length) {
    const an = ax.shift()
    const bn = bx.shift()
    const nn = an[0] - bn[0] || an[1].localeCompare(bn[1])
    if (nn) return nn
  }
  return ax.length - bx.length
}

function fmtTimecode(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = (totalSeconds % 60).toFixed(1)
  return m + ":" + s.padStart(4, "0")
}

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function escPath(s) {
  return encodeURI(s)
}

function buildXML({ frames, fps, width, height, basePath }) {
  const timebase = Math.round(fps)
  const ntsc = Math.abs(fps - timebase) > 0.001 ? "TRUE" : "FALSE"
  let base = basePath.trim()
  if (!base.startsWith("/")) base = "/" + base
  if (!base.endsWith("/")) base += "/"

  let clipitems = ""
  let startFrame = 0
  let totalFrames = 0

  frames.forEach((fr, i) => {
    const dur = Math.max(1, Math.round(fr.duration * fps))
    const endFrame = startFrame + dur
    const fullPath = base + fr.name
    // encodeURI leaves "&" unescaped, which is invalid inside an XML node —
    // run the encoded path through escXml so odd filenames still export valid XML.
    const pathurl = escXml("file://localhost" + escPath(fullPath))
    clipitems += `
          <clipitem id="clipitem-${i + 1}">
            <name>${escXml(fr.name)}</name>
            <enabled>TRUE</enabled>
            <duration>${dur}</duration>
            <rate><timebase>${timebase}</timebase><ntsc>${ntsc}</ntsc></rate>
            <start>${startFrame}</start>
            <end>${endFrame}</end>
            <in>0</in>
            <out>${dur}</out>
            <file id="file-${i + 1}">
              <name>${escXml(fr.name)}</name>
              <pathurl>${pathurl}</pathurl>
              <rate><timebase>${timebase}</timebase><ntsc>${ntsc}</ntsc></rate>
              <duration>${dur}</duration>
              <media>
                <video>
                  <samplecharacteristics>
                    <width>${width}</width>
                    <height>${height}</height>
                  </samplecharacteristics>
                </video>
              </media>
            </file>
          </clipitem>`
    startFrame = endFrame
    totalFrames = endFrame
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="5">
  <sequence>
    <name>Storyboard Animatic</name>
    <duration>${totalFrames}</duration>
    <rate><timebase>${timebase}</timebase><ntsc>${ntsc}</ntsc></rate>
    <media>
      <video>
        <format>
          <samplecharacteristics>
            <rate><timebase>${timebase}</timebase><ntsc>${ntsc}</ntsc></rate>
            <width>${width}</width>
            <height>${height}</height>
          </samplecharacteristics>
        </format>
        <track>${clipitems}
        </track>
      </video>
    </media>
  </sequence>
</xmeml>`
}

const DIAL_CIRC = 238.76 // 2·π·38
const PACE_REF_SECONDS = 4 // dial fills once every ~4s, purely a cosmetic pace reference
const IMG_RE = /\.(png|jpe?g|webp|gif|tiff?)$/i

// ---------------------------------------------------------------------------
// Styled components (light theme, matching the rest of the site)
// ---------------------------------------------------------------------------

const RED = "#d6524a"

const Wrap = styled.div`
  padding-bottom: 60px;
  max-width: 860px;
`

const StageLabel = styled.div`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.72em;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 6px;
`

const Intro = styled.p`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.serif};
  font-size: 0.95em;
  line-height: 1.6;
  margin: 0.9em 0 2em 0;
`

const Panel = styled.section`
  border: 1px solid ${props => props.theme.colors.lightestGray};
  border-radius: 8px;
  padding: 28px;
  margin-bottom: 20px;
  background: #fff;
`

const PanelHeading = styled.h2`
  color: ${props => props.theme.colors.black};
  font-size: 1.15em;
  font-weight: 600;
  margin: 0 0 6px 0;
  display: flex;
  align-items: center;
`

const StepBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${props => props.theme.colors.yellow};
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.7em;
  font-weight: 700;
  margin-right: 10px;
`

const Sub = styled.p`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.serif};
  font-size: 0.9em;
  line-height: 1.6;
  margin: 0 0 22px 0;
`

const Code = styled.code`
  background: ${props => props.theme.colors.lightestGray};
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9em;
  padding: 1px 6px;
  border-radius: 3px;
`

const Dropzone = styled.div`
  border: 1.5px dashed ${props => props.theme.colors.lightGray};
  border-radius: 6px;
  padding: 38px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${props => props.theme.colors.yellow};
    background: ${props => props.theme.colors.lightestGray};
  }
`

const DzBig = styled.div`
  color: ${props => props.theme.colors.black};
  font-weight: 600;
  font-size: 1em;
`

const DzSmall = styled.div`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.78em;
  margin-top: 8px;
`

const FieldRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`

const Field = styled.div`
  flex: ${props => props.flex || 1};
  min-width: 160px;
`

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.7em;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 100%;
  background: #fff;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 4px;
  color: ${props => props.theme.colors.black};
  padding: 10px 12px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9em;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.yellow};
  }
`

const Hint = styled.div`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.serif};
  font-size: 0.8em;
  line-height: 1.5;
  margin-top: 6px;
`

const Button = styled.button`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.85em;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 11px 20px;
  cursor: pointer;
  transition: all 0.12s ease;

  ${props =>
    props.variant === "primary" &&
    css`
      background: ${props.theme.colors.yellow};
      color: ${props.theme.colors.black};
      &:hover {
        filter: brightness(0.96);
      }
      &:disabled {
        background: ${props.theme.colors.lightestGray};
        color: ${props.theme.colors.lightGray};
        cursor: not-allowed;
      }
    `}

  ${props =>
    props.variant === "secondary" &&
    css`
      background: #fff;
      color: ${props.theme.colors.black};
      border-color: ${props.theme.colors.lightGray};
      &:hover {
        border-color: ${props.theme.colors.black};
      }
    `}

  ${props =>
    props.variant === "danger" &&
    css`
      background: #fff;
      color: ${RED};
      border-color: ${RED};
      &:hover {
        background: ${RED};
        color: #fff;
      }
    `}

  ${props =>
    props.small &&
    css`
      padding: 7px 14px;
      font-size: 0.78em;
    `}
`

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 22px;
  flex-wrap: wrap;
`

const Filmstrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
`

const FrameChip = styled.div`
  position: relative;
  width: 96px;
  background: #fff;
  border: 1px solid ${props => props.theme.colors.lightestGray};
  border-radius: 4px;
  overflow: hidden;
  cursor: grab;
  user-select: none;

  ${props =>
    props.dragging &&
    css`
      opacity: 0.35;
    `}

  img {
    display: block;
    width: 100%;
    height: 64px;
    object-fit: cover;
    background: #000;
  }
`

const ChipIdx = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: rgba(0, 0, 0, 0.65);
  color: ${props => props.theme.colors.yellow};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.62em;
  padding: 1px 5px;
  border-radius: 2px;
`

const ChipName = styled.div`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.62em;
  padding: 4px 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RecordStage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`

const RecordFrameBox = styled.div`
  width: 100%;
  max-width: 640px;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 1px solid ${props => props.theme.colors.lightestGray};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
`

const RecBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.72em;
  letter-spacing: 1px;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  padding: 4px 9px;
  border-radius: 20px;
`

const RecDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${RED};
  animation: ${pulse} 1.1s infinite;
`

const DialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`

const Dial = styled.div`
  position: relative;
  width: 88px;
  height: 88px;

  svg {
    transform: rotate(-90deg);
  }
`

const DialTime = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.85em;
  color: ${props => props.theme.colors.black};
`

const FrameMeta = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.lightGray};
  font-size: 0.82em;
  text-align: center;
  line-height: 1.6;

  b {
    color: ${props => props.theme.colors.black};
  }
`

const RecordControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

const KeyHint = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.72em;
  color: ${props => props.theme.colors.lightGray};
  text-align: center;

  kbd {
    background: ${props => props.theme.colors.lightestGray};
    border: 1px solid ${props => props.theme.colors.lightGray};
    border-radius: 3px;
    padding: 2px 7px;
    color: ${props => props.theme.colors.black};
  }
`

const TableWrap = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85em;

  thead th {
    text-align: left;
    font-family: ${props => props.theme.fonts.mono};
    font-size: 0.72em;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${props => props.theme.colors.lightGray};
    border-bottom: 1px solid ${props => props.theme.colors.lightestGray};
    padding: 8px 10px;
    white-space: nowrap;
  }

  tbody td {
    border-bottom: 1px solid ${props => props.theme.colors.lightestGray};
    padding: 7px 10px;
    vertical-align: middle;
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.lightGray};
  }

  tbody td.name {
    color: ${props => props.theme.colors.black};
  }

  td.thumb img {
    width: 52px;
    height: 34px;
    object-fit: cover;
    border-radius: 2px;
    display: block;
    background: #000;
  }
`

const DurInput = styled.input`
  width: 78px;
  background: #fff;
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 3px;
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.mono};
  padding: 5px 8px;
  font-size: 0.95em;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.yellow};
  }
`

const TotalsBar = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${props => props.theme.colors.lightestGray};

  .tot-item {
    font-family: ${props => props.theme.fonts.mono};
    font-size: 0.8em;
    color: ${props => props.theme.colors.lightGray};
  }
  .tot-item b {
    color: ${props => props.theme.colors.black};
    font-size: 1.15em;
    margin-left: 4px;
  }
`

const Instructions = styled.div`
  font-family: ${props => props.theme.fonts.serif};
  font-size: 0.9em;
  line-height: 1.8;
  color: ${props => props.theme.colors.black};

  ol {
    padding-left: 20px;
    margin: 0;
  }
  li {
    margin-bottom: 6px;
  }
`

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

const StoryboardPage = () => {
  const [step, setStep] = useState("setup") // setup | record | review | done
  const [frames, setFrames] = useState([]) // {file, url, name, duration}
  const [fps, setFps] = useState("24")
  const [width, setWidth] = useState("1920")
  const [height, setHeight] = useState("1080")
  const [basePath, setBasePath] = useState("")
  const [pathPlaceholder, setPathPlaceholder] = useState(
    "/Users/yourname/Desktop/storyboard-frames"
  )

  // Record view display state
  const [recIndex, setRecIndex] = useState(0)
  const [recording, setRecording] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [dragIndex, setDragIndex] = useState(null)

  // Imperative recording engine — kept in refs so the rAF loop and the
  // keyboard listener always read the latest values (no stale closures).
  const engine = useRef({
    recIndex: 0,
    recording: false,
    frameStartTime: 0,
    rafId: null,
  })
  const durationsRef = useRef([])
  const framesRef = useRef([])
  const fileInputRef = useRef(null)
  framesRef.current = frames

  const numFps = parseFloat(fps) || 24
  const numWidth = parseInt(width, 10) || 1920
  const numHeight = parseInt(height, 10) || 1080

  // Enable directory selection on the (otherwise standard) file input.
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("webkitdirectory", "")
      fileInputRef.current.setAttribute("directory", "")
      fileInputRef.current.setAttribute("multiple", "")
    }
  }, [])

  // Cleanup object URLs / animation frame on unmount.
  useEffect(
    () => () => {
      cancelAnimationFrame(engine.current.rafId)
      framesRef.current.forEach(fr => URL.revokeObjectURL(fr.url))
    },
    []
  )

  // Keyboard shortcuts only while recording.
  useEffect(() => {
    if (step !== "record") return undefined
    const onKey = e => {
      if (e.code === "Space") {
        e.preventDefault()
        if (!engine.current.recording) startRecording()
        else if (engine.current.recIndex === framesRef.current.length - 1)
          finishRecording()
        else advanceFrame()
      } else if (e.code === "Backspace") {
        e.preventDefault()
        goBackFrame()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // ---------- STEP 1: LOAD ----------
  const onFiles = e => {
    const files = Array.from(e.target.files).filter(f => IMG_RE.test(f.name))
    files.sort((a, b) => naturalCompare(a.name, b.name))
    framesRef.current.forEach(fr => URL.revokeObjectURL(fr.url))
    const next = files.map(f => ({
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
      duration: 1.0,
    }))
    setFrames(next)
    if (files.length && files[0].webkitRelativePath && !basePath) {
      const folder = files[0].webkitRelativePath.split("/")[0]
      setPathPlaceholder("/Users/yourname/.../" + folder)
    }
  }

  const reorder = to => {
    const from = dragIndex
    if (from == null || from === to) return
    setFrames(prev => {
      const copy = prev.slice()
      const [moved] = copy.splice(from, 1)
      copy.splice(to, 0, moved)
      return copy
    })
  }

  // ---------- STEP 2: RECORD ----------
  const goToRecord = () => {
    engine.current.recIndex = 0
    engine.current.recording = false
    durationsRef.current = frames.map(f => f.duration)
    setRecIndex(0)
    setRecording(false)
    setElapsed(0)
    setStep("record")
  }

  const runDialLoop = () => {
    cancelAnimationFrame(engine.current.rafId)
    const tick = () => {
      if (!engine.current.recording) return
      setElapsed((performance.now() - engine.current.frameStartTime) / 1000)
      engine.current.rafId = requestAnimationFrame(tick)
    }
    tick()
  }

  const startRecording = () => {
    engine.current.recording = true
    engine.current.frameStartTime = performance.now()
    setRecording(true)
    runDialLoop()
  }

  const advanceFrame = () => {
    if (!engine.current.recording) return
    const now = performance.now()
    const el = Math.max(0.04, (now - engine.current.frameStartTime) / 1000)
    durationsRef.current[engine.current.recIndex] = el
    engine.current.recIndex += 1
    if (engine.current.recIndex >= framesRef.current.length) {
      finishRecording()
      return
    }
    engine.current.frameStartTime = now
    setRecIndex(engine.current.recIndex)
  }

  const goBackFrame = () => {
    if (!engine.current.recording || engine.current.recIndex === 0) return
    engine.current.recIndex -= 1
    engine.current.frameStartTime = performance.now()
    setRecIndex(engine.current.recIndex)
  }

  const finishRecording = () => {
    const now = performance.now()
    const el = Math.max(0.04, (now - engine.current.frameStartTime) / 1000)
    durationsRef.current[framesRef.current.length - 1] = el
    engine.current.recording = false
    cancelAnimationFrame(engine.current.rafId)
    setRecording(false)
    setFrames(prev =>
      prev.map((f, i) => ({
        ...f,
        duration:
          durationsRef.current[i] != null
            ? durationsRef.current[i]
            : f.duration,
      }))
    )
    setStep("review")
  }

  // ---------- STEP 3: REVIEW ----------
  const setDuration = (idx, value) => {
    const v = parseFloat(value)
    if (isNaN(v) || v <= 0) return
    setFrames(prev =>
      prev.map((f, i) => (i === idx ? { ...f, duration: v } : f))
    )
  }

  // ---------- STEP 4: EXPORT ----------
  const exportXML = () => {
    const path = basePath.trim() || pathPlaceholder
    if (!path) {
      if (fileInputRef.current) fileInputRef.current.focus()
      window.alert(
        "Add the folder path where your frame images live on disk before exporting — Premiere needs it to link the files."
      )
      return
    }
    const xml = buildXML({
      frames,
      fps: numFps,
      width: numWidth,
      height: numHeight,
      basePath: path,
    })
    const blob = new Blob([xml], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "storyboard-animatic.xml"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    setStep("done")
  }

  const startOver = () => {
    frames.forEach(f => URL.revokeObjectURL(f.url))
    setFrames([])
    if (fileInputRef.current) fileInputRef.current.value = ""
    setStep("setup")
  }

  // Derived review numbers.
  let runningSeconds = 0
  let totalFrames = 0
  const reviewRows = frames.map((fr, i) => {
    const frameCount = Math.max(1, Math.round(fr.duration * numFps))
    const startsAt = fmtTimecode(runningSeconds)
    runningSeconds += frameCount / numFps
    totalFrames += frameCount
    return { fr, i, frameCount, startsAt }
  })

  const atLast = recIndex === frames.length - 1
  const dialOffset =
    DIAL_CIRC * (1 - (elapsed % PACE_REF_SECONDS) / PACE_REF_SECONDS)
  const current = frames[recIndex]

  const stageLabel = {
    setup: "01 / Load frames",
    record: "02 / Record pacing",
    review: "03 / Review & export",
    done: "04 / Import in Premiere",
  }[step]

  return (
    <Layout tab="Storyboard">
      <SEO title="Storyboard Pacer" />
      <Wrap>
        <Title>Storyboard Pacer</Title>
        <StageLabel>{stageLabel}</StageLabel>
        <Intro>
          Time a Photoshop storyboard by clicking through your frames at the
          speed you want them to play, then export an XML that Premiere Pro
          imports as a sequence with every frame already trimmed to its recorded
          duration.
        </Intro>

        {/* STEP 1: SETUP */}
        {step === "setup" && (
          <Panel>
            <PanelHeading>
              <StepBadge>1</StepBadge>Load your frames
            </PanelHeading>
            <Sub>
              Export your storyboard layers from Photoshop first (
              <Code>File → Export → Layers to Files</Code>, numbered so they
              sort in order), then select that folder here.
            </Sub>

            <Dropzone
              onClick={() =>
                fileInputRef.current && fileInputRef.current.click()
              }
            >
              <DzBig>Click to choose your frames folder</DzBig>
              <DzSmall>
                PNG / JPG — sorted automatically by filename, drag chips below
                to reorder
              </DzSmall>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onFiles}
              />
            </Dropzone>

            {frames.length > 0 && (
              <Filmstrip>
                {frames.map((fr, i) => (
                  <FrameChip
                    key={fr.url}
                    draggable
                    dragging={dragIndex === i}
                    onDragStart={() => setDragIndex(i)}
                    onDragEnd={() => setDragIndex(null)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault()
                      reorder(i)
                    }}
                  >
                    <ChipIdx>{i + 1}</ChipIdx>
                    <img src={fr.url} alt={fr.name} />
                    <ChipName>{fr.name}</ChipName>
                  </FrameChip>
                ))}
              </Filmstrip>
            )}

            <FieldRow style={{ marginTop: "24px" }}>
              <Field>
                <Label>Frame rate (fps)</Label>
                <Input
                  type="number"
                  min="1"
                  step="0.001"
                  value={fps}
                  onChange={e => setFps(e.target.value)}
                />
              </Field>
              <Field>
                <Label>Sequence width</Label>
                <Input
                  type="number"
                  min="1"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                />
              </Field>
              <Field>
                <Label>Sequence height</Label>
                <Input
                  type="number"
                  min="1"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                />
              </Field>
            </FieldRow>
            <FieldRow>
              <Field flex="2">
                <Label>Folder path on disk (Mac)</Label>
                <Input
                  type="text"
                  placeholder={pathPlaceholder}
                  value={basePath}
                  onChange={e => setBasePath(e.target.value)}
                />
                <Hint>
                  The exact folder these images live in — Premiere needs this to
                  relink the files on import. Right-click the folder in Finder →
                  hold Option → “Copy … as Pathname”.
                </Hint>
              </Field>
            </FieldRow>

            <ActionRow>
              <Button
                variant="primary"
                disabled={frames.length === 0}
                onClick={goToRecord}
              >
                Start recording pacing →
              </Button>
            </ActionRow>
          </Panel>
        )}

        {/* STEP 2: RECORD */}
        {step === "record" && (
          <Panel>
            <PanelHeading>
              <StepBadge>2</StepBadge>Record your pacing
            </PanelHeading>
            <Sub>
              Click through the frames at the speed you want them to play. The
              time you spend on each one becomes its duration in the timeline.
            </Sub>

            <RecordStage>
              <RecordFrameBox>
                {recording && (
                  <RecBadge>
                    <RecDot />
                    REC
                  </RecBadge>
                )}
                {current && <img src={current.url} alt={current.name} />}
              </RecordFrameBox>

              <DialRow>
                <Dial>
                  <svg width="88" height="88" viewBox="0 0 88 88">
                    <circle
                      cx="44"
                      cy="44"
                      r="38"
                      fill="none"
                      stroke="#EDF2F7"
                      strokeWidth="5"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="38"
                      fill="none"
                      stroke="#FFD148"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={DIAL_CIRC}
                      strokeDashoffset={recording ? dialOffset : DIAL_CIRC}
                      style={{ transition: "stroke-dashoffset 0.05s linear" }}
                    />
                  </svg>
                  <DialTime>{elapsed.toFixed(1)}s</DialTime>
                </Dial>
                <FrameMeta>
                  Frame <b>{recIndex + 1}</b> / {frames.length}
                  <br />
                  {current ? current.name : "—"}
                </FrameMeta>
              </DialRow>

              <RecordControls>
                <Button variant="secondary" small onClick={goBackFrame}>
                  ← Back one frame
                </Button>
                {!recording && (
                  <Button variant="primary" onClick={startRecording}>
                    Start
                  </Button>
                )}
                {recording && !atLast && (
                  <Button variant="primary" onClick={advanceFrame}>
                    Next frame ›
                  </Button>
                )}
                {recording && atLast && (
                  <Button variant="danger" onClick={finishRecording}>
                    Finish recording
                  </Button>
                )}
              </RecordControls>
              <KeyHint>
                {recording ? (
                  <>
                    Press <kbd>Space</kbd> to advance to the next frame ·{" "}
                    <kbd>Backspace</kbd> to go back
                  </>
                ) : (
                  <>
                    Press <kbd>Space</kbd> to start
                  </>
                )}
              </KeyHint>
            </RecordStage>
          </Panel>
        )}

        {/* STEP 3: REVIEW / EXPORT */}
        {step === "review" && (
          <Panel>
            <PanelHeading>
              <StepBadge>3</StepBadge>Review timing &amp; export
            </PanelHeading>
            <Sub>
              Fine-tune any duration below, then export a Premiere-ready XML.
            </Sub>

            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <th />
                    <th />
                    <th>Frame</th>
                    <th>Duration (s)</th>
                    <th>Frames</th>
                    <th>Starts at</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewRows.map(({ fr, i, frameCount, startsAt }) => (
                    <tr key={fr.url}>
                      <td className="thumb">
                        <img src={fr.url} alt={fr.name} />
                      </td>
                      <td className="name">{i + 1}</td>
                      <td className="name">{fr.name}</td>
                      <td>
                        <DurInput
                          type="number"
                          step="0.1"
                          min="0.1"
                          defaultValue={fr.duration.toFixed(2)}
                          onChange={e => setDuration(i, e.target.value)}
                        />
                      </td>
                      <td>{frameCount}f</td>
                      <td>{startsAt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>

            <TotalsBar>
              <div className="tot-item">
                Total runtime <b>{fmtTimecode(runningSeconds)}</b>
              </div>
              <div className="tot-item">
                Total frames <b>{totalFrames}</b>
              </div>
              <div className="tot-item">{frames.length} storyboard frames</div>
            </TotalsBar>

            <ActionRow>
              <Button variant="secondary" onClick={goToRecord}>
                Re-record pacing
              </Button>
              <Button variant="primary" onClick={exportXML}>
                Download Premiere XML
              </Button>
            </ActionRow>
          </Panel>
        )}

        {/* STEP 4: DONE */}
        {step === "done" && (
          <Panel>
            <PanelHeading>
              <StepBadge>✓</StepBadge>Import into Premiere
            </PanelHeading>
            <Instructions>
              <ol>
                <li>Open (or create) your Premiere Pro project.</li>
                <li>
                  Go to <Code>File → Import…</Code> and select the downloaded{" "}
                  <Code>.xml</Code> file.
                </li>
                <li>
                  Premiere will build a new sequence named{" "}
                  <Code>Storyboard Animatic</Code> with every frame already
                  trimmed to the duration you recorded.
                </li>
                <li>
                  If clips show up offline, double-check the folder path you
                  entered matches exactly where the images sit on disk, then{" "}
                  <Code>File → Project Manager</Code> or right-click →{" "}
                  <Code>Link Media</Code>.
                </li>
              </ol>
            </Instructions>
            <ActionRow>
              <Button variant="secondary" onClick={() => setStep("review")}>
                ← Back to review
              </Button>
              <Button variant="primary" onClick={startOver}>
                Start a new storyboard
              </Button>
            </ActionRow>
          </Panel>
        )}
      </Wrap>
    </Layout>
  )
}

export default StoryboardPage
