# Onshape Document Setup

How our team CAD is organised in Onshape. For how to model inside a document, see [Onshape Modelling](./onshape-modelling).

## Folder Structure

The structure of the Onshape folders we store our CAD documents in should be as follows.

- One folder per season, named after the 4 digit year, e.g. `2026`
- A `Common` folder for documents containing reusable parts
- An `Exercises` folder for training exercises

<figure>
<img src="./images/onshape-folder-structure.png" alt="Onshape team folders" width="700">
<figcaption>Our team folders in Onshape</figcaption>
</figure>

## Document Structure

We structure our robots in multiple documents, allocating each subsystem a single document.

Each season's folder (see [Folder Structure](#folder-structure)) contains:
- One top-level robot document containing a master-part studio and a final assembly, named `[year] Master`, e.g. `2026 Master`
- One document per major mechanism, named `[year] [mechanism]`, e.g. `2026 Intake`
- A prototyping document, named `[year] Prototyping`
- The public copy of the robot, named `FRC #6996 [year] ...` (see the note on making documents public below)

A second robot gets its own folder within the season folder, with the same structure.

Parts from other documents can only be inserted from a version, so create a version when a mechanism is ready to be pulled in, and update references in the top level document when it changes. 

Each mechanism document should contain
- Part studios for each subsystem
- Assemblies for each subsystem
- An overall assembly for the mechanism
- A test assembly (an assembly which pulls other mechanisms in to test for interferences- without needing to update the version every time)

<figure>
<img src="./images/onshape-document-structure.png" alt="Onshape documents in the 2026 folder" width="420">
<figcaption>The 2026 folder: the public copy, the master document, a prototyping document and one document per mechanism</figcaption>
</figure>

Before making a document public, consider making a copy so the edit history isn't shared (e.g. when publishing robot CAD each year)

## Units
- Design the overall robot in inches. Each document for a major subassembly should be set up in inches.
