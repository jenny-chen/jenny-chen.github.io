import React from "react"
import styled from "styled-components"
import { Box, Flex, Text } from "./basics"

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px 24px;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }`}
`

const Label = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.7em;
  color: ${props => props.theme.colors.lightGray};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const Value = styled.span`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.95em;
  color: ${props => props.theme.colors.black};
  display: block;
  margin-top: 2px;
`

const RunTitle = styled.p`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.85em;
  color: ${props => props.theme.colors.black};
  margin: 0;
  font-weight: bold;
`

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.round(seconds % 60)
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }
  return `${m}:${String(s).padStart(2, "0")}`
}

function formatPace(seconds, miles) {
  if (!miles || miles === 0) return "—"
  const paceSeconds = seconds / miles
  const m = Math.floor(paceSeconds / 60)
  const s = Math.round(paceSeconds % 60)
  return `${m}:${String(s).padStart(2, "0")} /mi`
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function Stat({ label, value }) {
  return (
    <div>
      <Label>{label}</Label>
      <Value>{value || "—"}</Value>
    </div>
  )
}

const RunDetail = ({ run }) => {
  if (!run) {
    return (
      <Box style={{ opacity: 0.3 }}>
        <Text style={{ fontFamily: "inherit", fontSize: "0.85em" }}>
          Scroll to explore runs
        </Text>
      </Box>
    )
  }

  const title = run.title || run.routeName || ""

  return (
    <Box>
      {title && <RunTitle>{title}</RunTitle>}
      <Text style={{ margin: "4px 0 12px", fontSize: "0.8em" }}>
        {formatDate(run.date)}
      </Text>
      <DetailGrid>
        <Stat label="Distance" value={`${run.distance.toFixed(2)} mi`} />
        <Stat label="Duration" value={formatDuration(run.seconds)} />
        <Stat label="Pace" value={formatPace(run.seconds, run.distance)} />
        <Stat
          label="Avg HR"
          value={run.pulseAvg ? `${Math.round(run.pulseAvg)} bpm` : null}
        />
        <Stat
          label="Max HR"
          value={run.pulseMax ? `${Math.round(run.pulseMax)} bpm` : null}
        />
        <Stat
          label="Calories"
          value={run.kcal ? `${Math.round(run.kcal)}` : null}
        />
        <Stat
          label="Elev. Gain"
          value={
            run.elevationUp != null
              ? `${Math.round(run.elevationUp * 3.281)} ft`
              : null
          }
        />
        <Stat
          label="Elev. Loss"
          value={
            run.elevationDown != null
              ? `${Math.round(run.elevationDown * 3.281)} ft`
              : null
          }
        />
      </DetailGrid>
    </Box>
  )
}

export default RunDetail
