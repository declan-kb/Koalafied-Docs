# Drawing Template Guide

How to make a technical drawing in Onshape using the Koalafied drawing template.

## Creating a Drawing

The easiest way to create a technical drawing is to click the **+** in the bottom left corner of an Onshape document, then click **Create Drawing**.

<figure>
<img src="./images/drawing-create-menu.png" alt="Onshape + menu with Create Drawing highlighted" width="260">
<figcaption>The + menu in the bottom left of a document</figcaption>
</figure>

This opens a popup with a few options for drawing templates.

<figure>
<img src="./images/drawing-template-dialog.png" alt="Create Drawing dialog showing template sources" width="600">
<figcaption>The Create Drawing dialog</figcaption>
</figure>

To use the Koalafied template, select **FRC 6996** and click the most recent version of the template.

<figure>
<img src="./images/drawing-template-select.png" alt="Koalafied Drawing Template V2 selected under FRC 6996" width="600">
<figcaption>Selecting the Koalafied template under FRC 6996</figcaption>
</figure>

Once you click **OK**, you will get a blank copy of the template, along with a popup asking you to select a part studio or assembly. For now, close it with the **X**, as we need to set up a display state in the assembly first.

<figure>
<img src="./images/drawing-blank-template.png" alt="Blank Koalafied drawing template with the part selection popup open" width="700">
<figcaption>A blank template, with the part selection popup to close</figcaption>
</figure>

## Setting Up a Display State

A display state lets us choose which parts of an assembly or part studio are shown in a drawing. To create one, first hide everything you don't need, leaving only the parts you want in the drawing.

<figure>
<img src="./images/drawing-hidden-parts.png" alt="Gearbox assembly with only the inner plate, bearings and motor visible" width="500">
<figcaption>Only the parts we want in the drawing are left visible</figcaption>
</figure>

Then click **Display states**, create a new display state and give it a meaningful name.

<figure>
<img src="./images/drawing-display-states-button.png" alt="Display states button in the assembly toolbar" width="400">
<figcaption>The Display states button in the assembly toolbar</figcaption>
</figure>

<figure>
<img src="./images/drawing-display-state-add.png" alt="Display states dialog with a new state named Pivot Gearbox inner plate" width="400">
<figcaption>Naming and adding a display state</figcaption>
</figure>

## Creating the Technical Drawing

### Inserting a View

Back in your drawing, click **Insert view** and select the target assembly.

<figure>
<img src="./images/drawing-insert-view-button.png" alt="Insert view button and panel" width="300">
<figcaption>The Insert view tool</figcaption>
</figure>

<figure>
<img src="./images/drawing-insert-view-select.png" alt="Select a part or assembly popup with Gearbox Sub-Assembly highlighted" width="500">
<figcaption>Selecting the assembly to draw</figcaption>
</figure>

You can then select the scale, default view orientation and display state.

<figure>
<img src="./images/drawing-insert-view-options.png" alt="Insert view panel with orientation, display state and 1:3 scale set" width="700">
<figcaption>Setting the view orientation, display state and scale</figcaption>
</figure>

::: warning
Make sure the scale written in the title block matches the scale you chose.
:::

### Projected Views

Use the **Projected view** tool to add a few useful angles of the assembly.

<figure>
<img src="./images/drawing-projected-view-button.png" alt="Projected view button in the drawing toolbar" width="150">
<figcaption>The Projected view tool</figcaption>
</figure>

<figure>
<img src="./images/drawing-projected-views.png" alt="Drawing with front, side and isometric projected views of the gearbox plate" width="700">
<figcaption>Front, side and isometric views</figcaption>
</figure>

### Title Block

Fill in the relevant information in the title block.

<figure>
<img src="./images/drawing-title-block.png" alt="Filled in title block with drawer, checker, mechanism, title and scale" width="600">
<figcaption>A filled in title block</figcaption>
</figure>

::: warning
Only fill in **Checked by** if your CAD has actually been checked by someone else and approved for manufacturing.
:::

### Dimensions

Use the dimension tool to point out any key dimensions. For example, this drawing uses dimensions to show which side of the plate the bearing's flange goes on. If there are things such as shafts or extrusions, label their dimensions as well.

<figure>
<img src="./images/drawing-dimensions.png" alt="Drawing with diameter dimensions on the side view showing bearing flange position" width="700">
<figcaption>Dimensions showing which side the bearing flange sits on</figcaption>
</figure>

### Callouts

Click the **Callout** button and use it to label the relevant parts. Select **Name** under the **Part property** dropdown to automatically show the part's name. You can also change the text size and outline; we recommend **0.1 in** text and **no outline**.

<figure>
<img src="./images/drawing-callout-button.png" alt="Callout button in the drawing toolbar" width="140">
<figcaption>The Callout tool</figcaption>
</figure>

<figure>
<img src="./images/drawing-callouts-plate.png" alt="Gearbox plate drawing with callouts labelling the bearing, plate and motor" width="700">
<figcaption>Callouts on the gearbox plate drawing</figcaption>
</figure>

<figure>
<img src="./images/drawing-callouts-gearbox.png" alt="Full gearbox drawing with callouts labelling sprockets, gears, standoffs and braces" width="700">
<figcaption>Callouts on a full gearbox drawing</figcaption>
</figure>

<!--
## Bill of Materials

To set up your Bill of Materials table, return to your assembly and click the BOM table button.

<figure>
<img src="./images/drawing-bom-table.png" alt="Assembly Bill of materials panel opened from the BOM Table button" width="700">
<figcaption>The BOM table in the assembly</figcaption>
</figure>
-->
