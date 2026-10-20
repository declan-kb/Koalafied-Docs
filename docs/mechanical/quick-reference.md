# Quick Reference

The numbers you'll look up most while designing. Feel free to add things you think will be useful, or you find yourself looking up often. 

## Bolts

### Recommended Clearance and Tap Hole Sizes

| Thread | Clearance | Tap |
|--------|----------------|----------|
| 10-32 | [[5.0mm]]| [[4.0mm]] |
| 1/4-20 | [[6.5mm]] | [[5.1mm]] | 
| 8-32 | [[4.5mm]] | N/A |

::: details Imperial drill sizes
| Thread | Close fit | Free fit | Tap drill |
|--------|-----------|----------|-----------|
| 10-32 | #9 ([[0.196in]]) | #7 ([[0.201in]]) | #21 ([[0.159in]]) |
| 1/4-20 | F ([[0.257in]]) | H ([[0.266in]]) | #7 ([[0.201in]]) |
| 8-32 | #18 ([[0.1695in]]) | #16 ([[0.177in]]) | #29 ([[0.136in]]) |

Standard shop drill chart sizes. Tap drills are for a 75% thread in aluminium.
:::

Notes: 
- These clearance hole sizes are specced for close-fits, based on what drill sizes are readily available. 
- 4.0mm holes in CAD should be cut on the CNC with the drilling operation rather than the helical bore. 
- The correct nominal size for a 1/4-20 tap hole is 5.1mm. If drilling by hand, in aluminium, 5.0mm will likely be appropriate.

### Bolt Heads

| Bolt | Head OD | Head height | Hex key | Docs |
|------|---------|-------------|---------|------|
| 10-32 socket head | [[0.312in]] | [[0.190in]] | 5/32in | [Drawing](/10-32-socket-drawing.PDF) |
| 10-32 button head | [[0.361in]] | [[0.101in]] | 1/8in | [Drawing](/10-32-button-drawing.PDF) |

## Motors & Gearboxes

| Part | Outer size | Length | Bolt pattern | Docs |
|------|------------|--------|--------------|------|
| Kraken X60 | [[60mm OD, 63.5mm over bump]] | 2.94in body + 1.47in shaft | 11x 10-32 on 2in circle| [Drawing](/x60-drawing.pdf) |
| Kraken X44 | [[44mm OD, 47.4mm over bump]] | 2.94in body + 1.47in shaft | 11× 10-32, 1.375in circle | [Drawing](/x44-drawing.pdf) |
| Falcon 500 | 60mm OD | 3.2in (v2) or 3.54in (v3) body + 1.38in shaft | 6× 10-32, 2in circle | [Drawing v2](/FalconV2-drawing.PDF), [Drawing v3](/FalconV3-drawing.pdf) |
| VersaPlanetary | 1.75in × 1.66in | 1.36in + 0.5in per stage| 2x 10-32 on 2in circle | [Drawing](/VP-drawing.PDF), [User guide](/VP-user-guide.pdf), [Load guide](/VP-load-guide.pdf) |
| MAXPlanetary | 2in × 2.44in | 1.5in + 0.5in per stage| 4x 10-32 on 2in circle | [Drawing](/MP-drawing.pdf) |

## Power Transmission
Most of these values can be calculated in Onshape using the Origin Cube featurescript. For example:
- #SprocketPD_25(16) returns the pitch diameter for a 16T #25 chain
- #ChainCTC_25(100,16,24) returns the C-C distance for a 16T to 24T #25 chain sprocket transmission with a 100 link chain.


| Item | Value |
|------|-------|
| 20DP gear pitch diameter | Teeth ÷ 20 (in) |
| 20DP gear centre distance | (T1 + T2) ÷ 40 (in) |
| #25 chain pitch | 0.250in |
| #35 chain pitch | 0.375in |
| HTD belt pitch | 5mm |
| Belt and chain centre distance | Use [ReCalc](https://www.reca.lc) |

## Manufacturing

Feeds, speeds and other details are in [Fusion 360 CAM](./fusion-360-cam#quick-reference).
