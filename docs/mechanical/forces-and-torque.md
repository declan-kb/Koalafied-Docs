# Forces & Torque

Torque is rotational force. Every motor, arm, climber and gearbox on the robot is about torque, so it's worth understanding before [Power Transmission Basics](./power-transmission-basics).

## Torque

Torque is a force applied at a distance from a pivot:

$$T = F \times r$$

- $T$ is the torque, in newton metres (Nm)
- $F$ is the force, in newtons (N)
- $r$ is the distance from the pivot to where the force acts, in metres (m)

The force must be at right angles to the radius (tangential to the motion). For forces at other angles, see [Forces at an Angle](#forces-at-an-angle).

This is why a longer spanner makes a bolt easier to undo: the same force at a bigger radius gives more torque.

| Unit | Converts to |
|------|-------------|
| 1 Nm | 8.85 in-lb |
| 1 lbf | 4.45 N |
| 1 kg mass | 9.81 N weight |

## Newton's Laws for Rotation

Rotation follows the same laws as straight-line motion, with torque in place of force:

- An object stays still, or keeps spinning at a constant speed, unless a torque acts on it.
- $T = I\alpha$, the rotational version of $F = ma$. $I$ is the moment of inertia (how hard the object is to spin up) and $\alpha$ is the angular acceleration. This is why a heavy shooter flywheel takes longer to spin up, but holds its speed better between shots.
- If two objects push on each other, their torques are equal and opposite.

## Balancing Torques: the Seesaw

Two people of equal weight balance a seesaw at equal distances. If one person is twice as heavy, they need to sit at half the distance. The torques ($F \times r$) on each side are equal, so the seesaw doesn't rotate.

## Arms

Gravity pulls an arm straight down. How much torque that makes depends on the arm's angle:

- **Horizontal** - all of the weight acts at right angles to the arm, so the torque is the largest. Size the motor and ratio for this position.
- **Vertical** - the weight acts straight along the arm, through the pivot, so there is no torque.

::: tip Example
An arm has a mass of 4 kg, with its centre of mass 0.5 m from the pivot. Horizontal, the torque to hold it is:

$$T = (4 \times 9.81) \times 0.5 = 19.6 \text{ Nm}$$

A Kraken X60 has a stall torque of 7.09 Nm, so it needs a reduction of at least 19.6 ÷ 7.09 ≈ 2.8:1 just to hold the arm still at stall. In practice you need much more than that to move the arm quickly without overheating the motor. See [Putting It Together](./power-transmission-basics#putting-it-together).
:::

## Climbing with a Spool

A climber winds a cord onto a spool to lift the robot. The spool's radius is the $r$ in $T = F \times r$.

A 135 lb (61 kg) robot weighs about 600 N. On a spool with a 12.7 mm radius (1 in diameter):

$$T = 600 \times 0.0127 = 7.6 \text{ Nm}$$

A smaller spool needs less torque but winds in less cord per turn, so the climb is slower. This is the same trade-off as a gear ratio.

## Gears

Where two gears mesh, the teeth push on each other with equal force. Since $F = T / r$:

$$\frac{T_\text{in}}{r_\text{in}} = \frac{T_\text{out}}{r_\text{out}} \quad\Rightarrow\quad \frac{T_\text{out}}{T_\text{in}} = \frac{r_\text{out}}{r_\text{in}} = \frac{\text{output teeth}}{\text{input teeth}}$$

A gear's radius is proportional to its number of teeth, so a bigger output gear gives more torque. This is where the [gear ratio](./power-transmission-basics#gear-ratios) comes from.

## Forces at an Angle

When a force isn't at right angles to the radius, there are two equivalent ways to find its torque:

- Split the force into a part at right angles to the radius (which makes torque) and a part along the radius (which doesn't). Use only the right-angle part.
- Or keep the whole force, and use the shortest distance from the pivot to the line the force acts along.

## Things That Don't Rotate

When something isn't moving, like a ladder leaning against a wall, the torques on it add to zero around **any** point you choose. Choose the point that makes the calculation easiest, usually one where an unknown force acts, so that force drops out.

A simple hook climb, like the one on our 2026 robot, works the same way as the ladder.
