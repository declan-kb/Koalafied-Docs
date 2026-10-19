# Power Transmission Basics

Power transmission is how we get power from a motor to the thing it moves: a wheel, a roller, an arm or an elevator. Nearly every mechanism on the robot uses gears, belts or chain, so this is worth understanding before you design one.

::: info What you'll learn
- Work out a gear ratio, and what it does to speed and torque
- Combine stages to get a big reduction
- Predict which way each part of a drive turns
- Find the key dimensions of gears and belts, and choose between gears, belts and chain
:::

## Why We Need It

Why can't we connect an arm directly to a motor?

A Kraken X60 spins at 6000 RPM (i.e. 100 turns per second), but an arm might only need to turn at 60 RPM. The motor is also not strong enough to lift an arm. It spins very fast, but has very little torque. 

If you've ridden a bike you know the solution. In high gear, it's hard to push the pedals, but you go fast. In low gear pedalling up a hill is easy, but you go slowly. 

Power tranmission on our robot has two jobs:

- **Changes speed and torque** - slowing a motor down gives more torque, and speeding it up gives less.
- **Moves power somewhere else** - the motor rarely fits right where the power is needed.

::: tip Our example: an intake arm
Through this page we'll design the drive for an intake arm. It needs to turn at about 60 RPM, driven by a Kraken X60. By the end, you'll have filled in the gap:

<div class="ratio-chain">
  <div class="rc-node">Kraken X60<b>6000 RPM</b></div>
  <div class="rc-step">?</div>
  <div class="rc-node rc-out">Intake arm<b>60 RPM</b></div>
</div>
:::

## The Parts

Power moves from one shaft (the spinning rod that parts sit on) to another through three kinds of parts.

- **Gears**
- **Pulleys and belts**
- **Sprockets and chain**

We describe these parts by their number of teeth. **"60t"** means 60 teeth, so a 60t gear is much bigger than a 12t gear. 

Most FRC shafts are **hex shafts**, so parts with a hex bore turn with the shaft without needing keys or set screws. We use 1/2in and 3/8in hex (see [Hardware](./design-rules#hardware)).

<div class="figure-row">
<figure>
<img src="./images/steel-spur-gear.jpg" alt="60T gear">
<figcaption>A 60T gear (image: WCP)</figcaption>
</figure>
<figure>
<img src="./images/htd-belt.jpg" alt="Timing belt with teeth on the inside">
<figcaption>A timing belt (image: Fenner)</figcaption>
</figure>
<figure>
<img src="./images/sprocket.jpg" alt="24T sprocket">
<figcaption>A 24T sprocket (image: WCP)</figcaption>
</figure>
</div>

## Gear Ratios

Start with the demo. A small gear on the motor (the input) drives a bigger gear (the output).

1. If the output gear has more teeth than the input, will it spin faster or slower? Move the sliders and check.
2. Make both gears the same size. What happens to the speed and torque?

<GearRatio />

### What You Just Saw

A gear ratio compares the size (measured in teeth) of the output gear to the input gear:

$$\text{ratio} = \frac{\text{output teeth}}{\text{input teeth}}$$

A 12 tooth gear driving a 60 tooth gear is a 60/12 = 5:1 reduction. The output turns 5 times slower, with 5 times the torque:

$$\text{output speed} = \frac{\text{input speed}}{\text{ratio}} \qquad \text{output torque} = \text{input torque} \times \text{ratio}$$

- **Reduction** (ratio above 1:1) - output is slower than the input, with more torque. Most mechanisms need this.
- **Step-Up** (ratio below 1:1) - output is faster than the input, with less torque. Only rarely used, e.g. shooter flywheels.

The same idea works for pulleys and sprockets: count the teeth on each.

<Practice question="A 14T gear drives a 56T gear. What is the ratio?" :answer="4" unit=":1" working="56 ÷ 14 = 4, so 4:1" />

<Practice question="The 14T gear is on a Kraken X60 (6000 RPM). How fast does the 56T gear turn?" :answer="1500" unit="RPM" :tol="1" working="6000 ÷ 4 = 1500 RPM" />

## Stages and Gearboxes

Back to our intake arm. It needs 6000 ÷ 60 = **100:1**. One pair of gears might struggle. 

With a 12T input gear, the output would need 1200 teeth. At the size of teeth we normally use, that gear would be about 60in (1.5m) across.

Instead, we use several smaller reductions, called **stages**, one after another. The ratios multiply:

$$\text{total ratio} = \text{stage 1} \times \text{stage 2} \times \dots$$

::: tip Worked Example: Getting Our Arm to 100:1
- Two 5:1 MAXPlanetary stages: 5 × 5 = 25:1
- Then an 18T to 72T belt: 72 ÷ 18 = 4:1
- Total: 25 × 4 = **100:1**, so the arm turns at 6000 ÷ 100 = 60 RPM

Three MAXPlanetary stages (5 × 5 × 4) would also work– but you might need to move the power from the motor to the arm's pivot. 
:::

### Gearboxes

A gearbox packages one or more gear stages together.

- **Planetary gearboxes** - COTS gearboxes (e.g. MAXPlanetary) where small gears orbit around a central gear inside a ring. They are simple to use, compact and in line with the motor, and the ratio is easy to change by swapping stages. MAXPlanetary stages come in 3:1, 4:1 and 5:1, up to 125:1 in total. See [Gearboxes](./parts-and-materials#gearboxes) for the ones we have.
- **Spur gearboxes** - custom gearboxes we design and make ourselves, using regular gears side by side between plates. They take more work, but can be packaged to fit the mechanism, offset the output from the motor, and combine multiple motors onto one output.

<figure>
<img src="./images/maxplanetary.jpg" alt="MAXPlanetary gearbox" width="350">
<figcaption>MAXPlanetary with 5:1, 4:1 and 3:1 stages, a 60:1 reduction (image: REV Robotics)</figcaption>
</figure>

<Practice question="A 3:1 stage and a 5:1 stage, then an 18T to 36T belt. What is the total ratio?" :answer="30" unit=":1" working="3 × 5 × (36 ÷ 18) = 3 × 5 × 2 = 30:1" />

## Direction

Make a prediction for each of the three tabs, then watch the answer.

<GearDirection />

### What You Just Saw

- **Meshing gears** turn in opposite directions.
- **Belts and chain** turn both ends in the same direction.
- **Idler gear** - a gear (of any size) placed between two others reverses the direction without changing the ratio.

Direction can be flipped in code, so it only matters mechanically when two things driven by one motor need to turn a particular way relative to each other, e.g. the top and bottom rollers of an intake.

## Gears, Belts and Chain

There are three ways to carry power from one shaft to another. Each has its own key dimensions you need when you design with it.

FRC parts mix units: gears are sized in inches, and belts in millimetres.

### Gears

Gears mesh directly, so they are compact and never slip. We use them inside gearboxes, and where two shafts are close together. The shafts must be exactly the right distance apart.

The **Diametral Pitch (DP)** is the tooth size: the number of teeth per inch of pitch diameter. A higher DP means smaller teeth. Our standard is 20DP. Gears will only mesh if they have the same DP. 

Work through each tab to see where the dimension is and how to calculate it, then try the questions below.

<GearDimensions />

<Practice question="What is the pitch diameter of a 36T 20DP gear?" :answer="1.8" unit="in" :tol="0.000" working="36 ÷ 20 = 1.800 in" />

<Practice question="How far apart are the centres of an 18T and a 50T 20DP gear?" :answer="1.7" unit="in" :tol="0.000" working="(18 + 50) ÷ (2 × 20) = 1.700 in" />

::: details Going further: material, pressure angle and backlash
- **Material** - aluminium gears are lighter, and steel gears are stronger. Use steel for high load mechanisms like arms (see [Design Rules](./design-rules#power-transmission)).
- **Pressure angle** - the angle the teeth push on each other at, set by the tooth shape. Most FRC COTS gears are 14.5°. Check the pressure angle when mixing gears from different vendors, and when generating custom gears in CAD.
- **Backlash** - the small gap between meshing teeth, which causes play in a mechanism. Some is needed so the gears don't bind. Spacing gears slightly further apart than the exact centre distance (e.g. +0.003in) allows for manufacturing tolerances, so the gears don't bind or have tight spots.
:::

### Belts

- **Pitch** - the distance between teeth. We use HTD 5mm belts, which have 5mm between teeth.
- **Width** - wider belts carry more load. We normally use 9mm.
- **Tension** - a loose belt skips teeth under load. Design the centre distance to suit a real belt length, or add a tensioner.

<BeltDimensions />

<Practice question="What is the pitch diameter of a 24T HTD 5mm pulley?" :answer="38.197" unit="mm" :tol="0.1" working="24 × 5mm ÷ π = 38.20 mm" />

<Practice question="How long is an 80T HTD 5mm belt?" :answer="400" unit="mm" :tol="0.5" working="80 × 5mm = 400 mm" />


### Chain

Roller chain is strong, handles shock loads better than gears, and can be cut to any length. But it is heavier than belt, stretches over time and needs tensioning. We use it where a belt isn't strong enough.

<figure>
<img src="./images/chain-and-sprockets.png" alt="#25 chain running between two 24T sprockets" width="450">
<figcaption>#25 chain on two 24T sprockets (image: WCP)</figcaption>
</figure>

- **Size** - #25 has a 1/4in pitch and #35 has a 3/8in pitch. #35 is stronger and heavier. See [Chain Size](./design-rules#power-transmission) for when to use each.
- **Links** - chain is joined with a master link, and normally needs an even number of links. A half link allows an odd number, but it is weaker.
- **Tensioning** - use turnbuckles or a tensioner. A slack chain adds backlash (play), which makes mechanisms like arms and elevators hard to position accurately.
- **Clearance** - leave room for the chain clearance diameter, not just the sprocket's outside diameter.

<div class="figure-row photos">
<figure>
<img src="./images/rev-turnbuckle.jpg" alt="Turnbuckle for tensioning chain">
<figcaption>Turnbuckle for tensioning chain (image: REV Robotics)</figcaption>
</figure>
<figure>
<img src="./images/sprocket-diameters.png" alt="Sprocket with pitch, outside and chain clearance diameters labelled">
<figcaption>Sprocket diameters (image: WCP)</figcaption>
</figure>
</div>

### Which Should I Use?

| | Gears | Belts | Chain |
|--|-------|-------|-------|
| Distance between shafts | Short, set by gear size | Any | Any |
| Weight | Heavy in steel, lighter in aluminium | Light | Medium |
| Tensioning | Not needed | Needs to be tensioned | Needs tensioning, and stretches over time |
| Lengths | n/a | Fixed lengths only | Cut to any length |
| Strength | High in aluminium, very high in steel | Can skip teeth under high load | High |
| Shock loads | Teeth can crack or strip | Can skip teeth | Handles them well |

Use gears when the shafts are close or inside a gearbox, and chain when a belt isn't strong enough. See [Power Transmission](./design-rules#power-transmission) in Design Rules.

## Putting It Together
Here is the whole process for our intake arm:

1. **Work out what it needs.** 60 RPM from a 6000 RPM Kraken X60 is 100:1. (For a real design, use [ReCalc](https://www.reca.lc) with the arm's weight and length to check the torque too.)
2. **Split the ratio into stages.** A 5:1 × 5:1 MAXPlanetary on the motor gives 25:1. An 18T to 72T belt to the arm's pivot gives 4:1. 25 × 4 = 100:1.
3. **Check the parts.** Both pulleys are 18T or larger, and the MAXPlanetary stages are ones we can buy. See [Parts & Materials](./parts-and-materials).
4. **Find the dimensions.** Choose a real belt length, then find the centre distance with ReCalc.

<div class="ratio-chain">
  <div class="rc-node">Kraken X60<b>6000 RPM</b></div>
  <div class="rc-step">5:1 MP</div>
  <div class="rc-node"><b>1200 RPM</b></div>
  <div class="rc-step">5:1 MP</div>
  <div class="rc-node"><b>240 RPM</b></div>
  <div class="rc-step">18:72 belt</div>
  <div class="rc-node rc-out">Intake arm<b>60 RPM</b><small>100× torque</small></div>
</div>

## Quiz

Have a go at the quiz! All of the information you need is on the page you just read. 

<script setup>
// Quiz questions. answer is the position of the right option, counting from 0.
const questions = [
  {
    q: 'A 12T gear drives a 48T gear. What is the ratio?',
    options: ['1:4', '4:1', '36:1', '60:1'],
    answer: 1,
    explain: 'Output teeth ÷ input teeth: 48 ÷ 12 = 4, so 4:1.',
    review: '#gear-ratios',
  },
  {
    q: 'A Kraken X60 (6000 RPM) drives through a 3:1 reduction. What comes out?',
    options: ['18000 RPM, with 1/3 the torque', '2000 RPM, with the same torque', '2000 RPM, with 3× the torque', '6000 RPM, with 3× the torque'],
    answer: 2,
    explain: 'A reduction divides the speed and multiplies the torque by the ratio: 6000 ÷ 3 = 2000 RPM, with 3× the torque.',
    review: '#gear-ratios',
  },
  {
    q: 'Which set of MAXPlanetary stages gives 60:1?',
    options: ['5:1, 4:1 and 3:1', '4:1 and 5:1', '3:1, 3:1 and 5:1', '5:1 and 5:1'],
    answer: 0,
    explain: 'Stage ratios multiply: 5 × 4 × 3 = 60. The others give 20:1, 45:1 and 25:1.',
    review: '#stages-and-gearboxes',
  },
  {
    q: 'Why do we use several stages instead of one gear pair for a 100:1 reduction?',
    options: ['One pair would turn the output the wrong way', 'Stages make the output spin faster', 'Gears can only be made up to 5:1', 'The output gear would be far too big'],
    answer: 3,
    explain: 'With a 12T input, one pair would need a 1200T output gear, 60in across at 20DP. Stages multiply, so small reductions add up to a big one.',
    review: '#stages-and-gearboxes',
  },
  {
    q: 'Three gears mesh in a row. The first turns clockwise. Which way does the last one turn?',
    options: ['Clockwise', 'Anticlockwise', 'It depends on the size of the middle gear'],
    answer: 0,
    explain: 'Each mesh flips the direction, and two flips cancel out. The middle gear is an idler: its size doesn\'t change the direction or the ratio.',
    review: '#direction',
  },
  {
    q: 'Two rollers far apart need to spin the same way, driven by one motor. What should join them?',
    options: ['Two gears meshing directly', 'A belt', 'A bigger gear ratio', 'Nothing, just spin the motor faster'],
    answer: 1,
    explain: 'Both ends of a belt turn the same way, and a belt can span any distance. Meshing gears would turn them opposite ways, and need the shafts close together.',
    review: '#direction',
  },
  {
    q: 'What is the pitch diameter of a 40T 20DP gear?',
    options: ['0.5 in', '2.1 in', '2.0 in', '800 in'],
    answer: 2,
    explain: 'Pitch diameter = N ÷ DP = 40 ÷ 20 = 2.0 in. 2.1 in is the outer diameter, (40 + 2) ÷ 20.',
    review: '#gears',
  },
  {
    q: 'A gear sits close to a plate. Which size should you leave clearance around?',
    options: ['The pitch diameter', 'The outer diameter', 'The centre distance', 'The hex bore'],
    answer: 1,
    explain: 'The teeth stick out past the pitch circle, so the outer diameter is the real size of the gear.',
    review: '#gears',
  },
  {
    q: 'Why can\'t you pick any centre distance you like for a belt?',
    options: ['Belts only come in whole numbers of teeth', 'Pulleys have to touch each other', 'Belts stretch until they fit', 'The centre distance must equal the pitch diameter'],
    answer: 0,
    explain: 'Each belt has a fixed length, so once you choose the belt and pulleys, the centre distance is set. Design around a real belt, or add a tensioner.',
    review: '#belts',
  },
]
</script>

<Quiz :questions="questions" />