# Onshape Modelling

How we model inside a document so anyone on the team can open it and understand it. For how our documents and folders are organised, see [Onshape Document Setup](./onshape-document-setup).

## Units
- Type the units you mean. For example, if you want a 2mm gap in a inches document, type ‘2mm’ for the dimension. It will be stored and display 2mm when you edit it, even though the sketch displays inches.

## Naming
- Give all tabs and parts meaningful names, e.g. 'Intake Side plate', not 'Part 12'
- Give all features, planes and sketches meaningful names, e.g. 'Bearing holes', not 'Extrude 7'

## Part Studios
- Use folders in Part Studios to group together the sketches and features that make a specific part. This isn't always possible, but do it where you can.
- Order features so the design builds up logically, and roll back to insert new features in the right place rather than adding everything at the end.

## Materials, Mass and Appearance
- Assign a material to every part, e.g. Aluminium 6061 or Polycarbonate. Onshape uses it to calculate mass, so the robot's weight and centre of gravity are only right if every part has one.
- You can use the mass override for 3D printed parts, as infill means the material mass will be wrong. One option is using the mass estimate from the slicer.
- COTS parts from FRCdesignlib all come with a mass.
- Set appearances to match the real part, e.g. grey for aluminium, clear for polycarbonate, and the filament colour for printed parts.

## Assemblies
- Group all static parts from the part-studio in an assembly with a single group mate before adding any COTS parts. 
- Use sub-assemblies. This makes mating parts much easier and is essential when the sub-assembly is used repeatedly.
- Define mate points in the part studio to make constructing assemblies easier.
- Use the ability to mate parts to a sketch to simplify assemblies where appropriate. For example spacing parts along a shaft, as in the 2022 robot indexer.
- Use the FRC design app or pre-existing team CAD files wherever possible/practical

## Versions and Branches
- Create a version at each milestone (design review, sent to manufacture, competition)
  with a descriptive name, e.g. `Intake v2 - sent to CNC`.
- Use branches to try out design variations. Merge the branch you keep, and
  delete or clearly label the rest.

Do not make copies of documents in team folders just to muck around with. To experiment with design use branches, or make copies to one of your own private folders.
