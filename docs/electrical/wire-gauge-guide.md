# Wire Gauge Guide

This document records the different wire gauges we use across the robot. 

## Wire Gauges

The minimum wire gauges for different parts of the robot are specified in the game manual.

| Application | Gauge |
|:------------|:------|
| Battery to PDP | 6 AWG  |
| Size 31 – 40A breaker protected circuit | 12 AWG  |
| 21 – 30A breaker protected circuit | 14 AWG  |
| 6 – 20A breaker protected circuit<br>11-15A fuse protected circuit<br>Minimum Wire Size Between the PDP dedicated terminals and the VRM/RPM or PCM/PH Compressor outputs from the PCM/PH | 18 AWG |
| Between the PDP/PDH and the roboRIO<br>Between the PDH and VRM/RPM<br>≤5A breaker protected circuit<br>≤10A fuse protected circuit | 22 AWG |
| VRM 2A circuits | 24 AWG |
| roboRIO PWM port outputs | 26 AWG |
| SIGNAL LEVEL circuits (i.e. circuits which draw ≤1A continuous and are incapable of delivering >1A: e.g. roboRIO non-PWM outputs, CAN signals, VRM 500mA outputs) | 28 AWG  |

## Wire Gauges We Use

| Part | Gauge |
|:-----|:------|
| Talon SRX<br>Falcon 500 Power | 12AWG |
| Talon SRX CAN<br>Falcon 500 CAN (probably) | 22AWG |

## CAN Bus Wire

Sizes of some different options for CAN bus wire

| Wire Source | Approx Diameter | Approximate AWG |
|:------------|:----------------|:----------------|
| Old CAN Bus (that we have been using for years) | 0.45mm | 25 |
| KOP Sample CAN Wire | 0.77mm | 21 |
| New CAN wire (Nick bought, sold as 22AWG) | 0.55mm | 23 - 24 |
| Random (not tinned copper) | 0.72mm | 21 |

## AWG Wire Sizes

These sizes are a summary of values from [Wikipedia](https://en.wikipedia.org/wiki/American_wire_gauge). American Wire Gauge: decrease by 3 => double area.

| Gauge | Diameter (mm) | Area (mm²) |
|:------|:--------------|:-----------|
| 10 | 2.588 | 5.26 |
| 11 | 2.305 | 4.17 |
| 12 | 2.053 | 3.31 |
| 13 | 1.828 | 2.62 |
| 14 | 1.628 | 2.08 |
| 15 | 1.45 | 1.65 |
| 16 | 1.291 | 1.31 |
| 17 | 1.15 | 1.04 |
| 18 | 1.024 | 0.823 |
| 19 | 0.912 | 0.653 |
| 20 | 0.812 | 0.518 |
| 21 | 0.723 | 0.41 |
| 22 | 0.644 | 0.326 |
| 23 | 0.573 | 0.258 |
| 24 | 0.511 | 0.205 |
| 25 | 0.455 | 0.162 |
| 26 | 0.405 | 0.129 |

<figure>
<img src="./images/ferrule-sizes.png" alt="Ferrule sizes by AWG and cross-sectional area" width="600">
<figcaption>Ferrule sizes for each AWG, showing how cross-sectional area grows as gauge decreases.</figcaption>
</figure>

<https://www.youtube.com/watch?v=_EixzYfBS50>
