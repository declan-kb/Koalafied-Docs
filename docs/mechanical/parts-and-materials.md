# Parts & Materials

What we use and where to buy it. Check the [stock list](https://docs.google.com/spreadsheets/d/1-WUpauPn0w8gaDgV8chQGcHm4MKQWR08GLBQOgj7PT4/edit?usp=drive_web&ouid=101850487222114186850) before designing around a part or ordering.

Rules for using these parts are in [Design Rules](./design-rules#hardware). Shipping times are in [Vendors](./vendors).

## Materials

Custom sizes of any material are available on request.

| Material | What we stock | Buy from |
|----------|---------------|----------|
| Aluminium sheet (5052) | 2.5mm, 5mm | Capral |
| Polycarbonate sheet | 3mm, 4.5mm, 6mm, 9.5mm | Dotmar |
| MDF | 3mm, 6mm, 12mm, 18mm | Bunnings |
| Aluminium extrusion (6061), 2x1 and 1x1 | 0.125in, 0.1in\*, 0.05in\* wall | REV, WCP |
| 3D printing filament | PETG, PLA, TPU 95A, TPU 98A\* | BambuLab, Esun (Amazon) |

\* Existing stock only.

<figure>
<img src="./images/2x1-extrusion.jpg" alt="2x1 aluminium extrusion" width="250">
<figcaption>2x1 aluminium extrusion (image: WCP)</figcaption>
</figure>

## Motors

| Motor | Free speed | Stall torque | Power at 40A | Use for | Buy from |
|-------|------------|--------------|--------------|---------|----------|
| Kraken X60 | 6000 RPM | 7.09 Nm | ~410 W | Drivetrains, arms, elevators, climbers | WCP |
| Kraken X44 | 7758 RPM | 4.11 Nm | ~395 W | Rollers, intakes, tight spaces | WCP |
| Falcon 500 | 6380 RPM | 4.69 Nm | ~400 W | Existing stock only | No longer sold |
| JE (brushed, 22.2:1 built in) | 310 RPM at output | ~5 Nm at output | n/a (stalls at 26A) | Low load, low speed, e.g. turret hood, wrist | AndyMark |

<div class="figure-row photos">
<figure>
<img src="./images/kraken-x60-x44.jpg" alt="Kraken X60 and X44" style="height: 180px">
<figcaption>Kraken X60 (top) and X44 (image: WCP)</figcaption>
</figure>
<figure>
<img src="./images/falcon-500.jpg" alt="Falcon 500" style="height: 180px">
<figcaption>Falcon 500 (image: VEX Robotics)</figcaption>
</figure>
</div>

## Gearboxes

| Gearbox | Ratios | Max reduction | Motors | Buy from |
|---------|--------|---------------|--------|----------|
| MAXPlanetary | 3:1, 4:1, 5:1 stages, 1:1 brake | 125:1 | Kraken X44, X60. Falcon 500 if we have the input hardware | REV |
| Sport | Fixed, e.g. 4:1, 16:1, 48:1, 100:1. Servo ratchet available | 100:1 | Falcon 500 (no Kraken input hardware) | AndyMark |
| VersaPlanetary | 3:1, 4:1, 5:1, 7:1, 9:1, 10:1 stages | 30:1 on brushless | Falcon 500, brushed motors | No longer sold |

<div class="figure-row photos">
<figure>
<img src="./images/maxplanetary.jpg" alt="MAXPlanetary gearbox">
<figcaption>MAXPlanetary with 5:1, 4:1 and 3:1 stages, a 60:1 reduction (image: REV Robotics)</figcaption>
</figure>
<figure>
<img src="./images/sport.jpg" alt="AndyMark Sport gearbox">
<figcaption>Sport gearbox (image: AndyMark)</figcaption>
</figure>
</div>

## Power Transmission

Check the [stock list](https://docs.google.com/spreadsheets/d/1-WUpauPn0w8gaDgV8chQGcHm4MKQWR08GLBQOgj7PT4/edit?usp=drive_web&ouid=101850487222114186850) for the sizes we have.

| Item | What we use | Buy from |
|------|-------------|----------|
| Belts | 5mm HTD, typically 9mm wide | [PT Parts](https://ptparts.com.au), [Core Electronics](https://core-electronics.com.au), 3DP (prototype only) |
| Pulleys | 3D printed for most uses | 3DP |
| Spur gears | 20DP, aluminium and steel | REV, WCP |
| Custom gears | 12DP or coarser, cut on our CNC with a 2mm end mill | CNC |
| Sprockets | #25, #35 | REV, WCP |
| Chain | #25, #35 | WCP |

<div class="figure-row photos">
<figure>
<img src="./images/htd-belt.jpg" alt="5mm HTD timing belt" style="height: 180px">
<figcaption>5mm HTD timing belt (image: Fenner)</figcaption>
</figure>
<figure>
<img src="./images/steel-spur-gear.jpg" alt="60T 20DP steel spur gear" style="height: 180px">
<figcaption>60T 20DP steel spur gear (image: WCP)</figcaption>
</figure>
<figure>
<img src="./images/pinion.jpg" alt="13T steel pinion" style="height: 180px">
<figcaption>13T pinion, which mounts directly on a motor shaft (image: WCP)</figcaption>
</figure>
<figure>
<img src="./images/sprocket.jpg" alt="24T #25 sprocket" style="height: 180px">
<figcaption>24T #25 sprocket (image: WCP)</figcaption>
</figure>
</div>

## Swerve Modules

| Module | Drive ratios | Motors | Buy from |
|--------|--------------|--------|----------|
| MK4i | L1 (8.14:1), L2 (6.75:1) | Falcon 500 only | SDS, AndyMark |
| MK4c | L2+ (5.9:1) | Kraken X60 only | SDS, AndyMark |
| MK5n | Three ratios, changed by swapping the motor pinion | Kraken X60 drive, Kraken X44 steering | SDS, AndyMark |

Spares (tread, wheels, belts, ratio kits) come from [SDS](https://www.swervedrivespecialties.com).

<div class="figure-row photos">
<figure>
<img src="./images/mk4i.jpg" alt="SDS MK4i" style="height: 180px">
<figcaption>MK4i (image: SDS)</figcaption>
</figure>
<figure>
<img src="./images/mk4c.jpg" alt="SDS MK4c" style="height: 180px">
<figcaption>MK4c (image: SDS)</figcaption>
</figure>
<figure>
<img src="./images/mk5n.jpg" alt="SDS MK5n" style="height: 180px">
<figcaption>MK5n (image: SDS)</figcaption>
</figure>
</div>
