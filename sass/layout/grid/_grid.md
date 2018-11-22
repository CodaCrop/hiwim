---
title: Grid
---

# Grid system

<!--Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pellentesque, quam nec maximus vehicula, lectus mauris suscipit risus, quis consequat massa dui vel turpis.

<div class="row">
    <div class="column">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
    <div class="column">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
    <div class="column">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
</div>

<div class="row">
    <div class="column">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
    <div class="column-6">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
    <div class="column">
        <div class="doc-example-box">Column 1 of 3</div>
    </div>
</div>

<div class="row">
    <div class="column">
        <div class="doc-example-box">Column</div>
    </div>
    <div class="column-auto">
        <div class="doc-example-box">Text</div>
    </div>
    <div class="column">
        <div class="doc-example-box">Column</div>
    </div>
</div>

<div class="row mb-3">
	<div class="column-tablet-4">
		<div class="doc-example-box">Column 1 of 3</div>
	</div>
	<div class="column-tablet-4">
		<div class="doc-example-box">Column 1 of 3</div>
	</div>
	<div class="column-tablet-4">
		<div class="doc-example-box">Column 1 of 3</div>
	</div>
</div>

<div class="row no-gutters mb-3">
	<div class="column-4">
		<div class="doc-example-box">Column without gutters</div>
	</div>
	<div class="column-4">
		<div class="doc-example-box">Column without gutters</div>
	</div>
	<div class="column-4">
		<div class="doc-example-box">Column without gutters</div>
	</div>
</div>

<div class="row row-marker">
	<div class="column-4">
		<div class="doc-example-box">
			Column with marker<br /><br />
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis vulputate arcu, a porttitor nulla varius ac. Nulla euismod aliquam mollis.
		</div>
	</div>
	<div class="column-4">
		<div class="doc-example-box">
			Column with marker
		</div>
	</div>
	<div class="column-4">
		<div class="doc-example-box">
			Column with marker
		</div>
	</div>
</div>-->

## How it works

Bootstrap's grid system uses a series of containers, rows, and columns to layout and align content. It's built with flexbox and is fully responsive. Below is an example and an in-depth look at how the grid comes together.

<div class="bd-example bd-example-row">
<div class="container">
  <div class="row">
    <div class="column-tablet">
	<div class="doc-example-box">
      One of three columns
	  </div>
    </div>
    <div class="column-tablet">
	<div class="doc-example-box">
      One of three columns
	  </div>
    </div>
    <div class="column-tablet">
	<div class="doc-example-box">
      One of three columns
	  </div>
    </div>
  </div>
</div>
</div>

The above example creates three equal-width columns on small, medium, large, and extra large devices using our predefined grid classes. Those columns are centered in the page with the parent `.container`.

Breaking it down, here's how it works:

- Containers provide a means to center your site's contents. Use `.container` for fixed width or `.container-fluid` for full width.
- Rows are horizontal groups of columns that ensure your columns are lined up properly. We use the negative margin method on `.row` to ensure all your content is aligned properly down the left side.
- Content should be placed within columns, and only columns may be immediate children of rows.
- Thanks to flexbox, grid columns without a set width will automatically layout with equal widths. For example, four instances of `.column-sm` will each automatically be 25% wide for small breakpoints.
- Column classes indicate the number of columns you'd like to use out of the possible 12 per row. So, if you want three equal-width columns, you can use `.column-sm-4`.
- Column `width`s are set in percentages, so they're always fluid and sized relative to their parent element.
- Columns have horizontal `padding` to create the gutters between individual columns, however, you can remove the `margin` from rows and `padding` from columns with `.no-gutters` on the `.row`.
- There are five grid tiers, one for each [responsive breakpoint]({{ site.baseurl }}/docs/{{ site.docs_version }}/layout/overview/#responsive-breakpoints): all breakpoints (extra small), small, medium, large, and extra large.
- Grid tiers are based on minimum widths, meaning they apply to that one tier and all those above it (e.g., `.column-sm-4` applies to small, medium, large, and extra large devices).
- You can use predefined grid classes or Sass mixins for more semantic markup.

Be aware of the limitations and [bugs around flexbox](https://github.com/philipwalton/flexbugs), like the [inability to use some HTML elements as flex containers](https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers).

Sounds good? Great, let's move on to seeing all that in an example.

## Grid options

While Bootstrap uses `em`s or `rem`s for defining most sizes, `px`s are used for grid breakpoints and container widths. This is because the viewport width is in pixels and does not change with the [font size](https://drafts.csswg.org/mediaqueries-3/#units).

See how aspects of the Bootstrap grid system work across multiple devices with a handy table.

<!--<table class="table table-bordered table-striped table-responsive">
  <thead>
    <tr>
      <th></th>
      <th class="text-center">
        Extra small<br>
        <small>&lt;576px</small>
      </th>
      <th class="text-center">
        Small<br>
        <small>&ge;576px</small>
      </th>
      <th class="text-center">
        Medium<br>
        <small>&ge;768px</small>
      </th>
      <th class="text-center">
        Large<br>
        <small>&ge;992px</small>
      </th>
      <th class="text-center">
        Extra large<br>
        <small>&ge;1200px</small>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="text-nowrap" scope="row">Grid behavior</th>
      <td>Horizontal at all times</td>
      <td colspan="4">Collapsed to start, horizontal above breakpoints</td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row">Max container width</th>
      <td>None (auto)</td>
      <td>540px</td>
      <td>720px</td>
      <td>960px</td>
      <td>1140px</td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row">Class prefix</th>
      <td><code>.column-</code></td>
      <td><code>.column-sm-</code></td>
      <td><code>.column-md-</code></td>
      <td><code>.column-lg-</code></td>
      <td><code>.column-xl-</code></td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row"># of columns</th>
      <td colspan="5">12</td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row">Gutter width</th>
      <td colspan="5">30px (15px on each side of a column)</td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row">Nestable</th>
      <td colspan="5">Yes</td>
    </tr>
    <tr>
      <th class="text-nowrap" scope="row">Column ordering</th>
      <td colspan="5">Yes</td>
    </tr>
  </tbody>
</table>-->

## Auto-layout columns

Utilize breakpoint-specific column classes for easy column sizing without an explicit numbered class like `.column-sm-6`.

### Equal-width

For example, here are two grid layouts that apply to every device and viewport, from `xs` to `xl`. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					1 of 2
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					2 of 2
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					1 of 3
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					2 of 3
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					3 of 3
				</div>
			</div>
		</div>
	</div>
</div>

Equal-width columns can be broken into multiple lines, but there is a [Safari flexbox bug](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items) that prevents this from working without an explicit `flex-basis` or `border`. Our example works thanks to the `border` being set; you can do the same with `.col { border: 1px solid transparent; }`. Alternatively, you can set the flex-basis to the width of the column (e.g., `.col { flex: 1 0 50%; }`).

Both these fixes have been documented in a [reduced test case outside Bootstrap](https://output.jsbin.com/micohor).

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>
			</div>
			<div class="w-100"></div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>
			</div>
		</div>
	</div>
</div>

### Setting one column width

Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it. You may use predefined grid classes (as shown below), grid mixins, or inline widths. Note that the other columns will resize no matter the width of the center column.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					1 of 3
				</div>
			</div>
			<div class="column-6">
				<div class="doc-example-box">
					2 of 3 (wider)
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					3 of 3
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					1 of 3
				</div>
			</div>
			<div class="column-5">
				<div class="doc-example-box">
					2 of 3 (wider)
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					3 of 3
				</div>
			</div>
		</div>
	</div>
</div>

### Variable width content

Use `column-{breakpoint}-auto` classes to size columns based on the natural width of their content.

<div class="bd-example-row">
	<div class="container">
		<div class="row justify-content-tablet-center">
			<div class="column column-desktop-2">
				<div class="doc-example-box">
					1 of 3
				</div>
			</div>
			<div class="column-tablet-auto column-mobile-12">
				<div class="doc-example-box">
					Variable width content
				</div>
			</div>
			<div class="column column-desktop-2">
				<div class="doc-example-box">
					3 of 3
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					1 of 3
				</div>
			</div>
			<div class="column-tablet-auto column-mobile-12">
				<div class="doc-example-box">
					Variable width content
				</div>
			</div>
			<div class="column column-desktop-2">
				<div class="doc-example-box">
					3 of 3
				</div>
			</div>
		</div>
	</div>
</div>

### Equal-width multi-row

Create equal-width columns that span multiple rows by inserting a `.w-100` where you want the columns to break to a new line. Make the breaks responsive by mixing the `.w-100` with some [responsive display utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/display/).

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="w-100"></div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
		</div>
	</div>
</div>

## Responsive classes

Bootstrap's grid includes five tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on extra small, small, medium, large, or extra large devices however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the `.col` and `.column-*` classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to `.col`.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
			<div class="column">
				<div class="doc-example-box">
					Column
				</div>	
			</div>
		</div>
		<div class="row">
			<div class="column-8">
				<div class="doc-example-box">
					column-8
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					column-4
				</div>
			</div>
		</div>
	</div>
</div>

### Stacked to horizontal

Using a single set of `.column-sm-*` classes, you can create a basic grid system that starts out stacked on extra small devices before becoming horizontal on desktop (medium) devices.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column-8">
				<div class="doc-example-box">
					column-8
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					column-4
				</div>	  
			</div>
		</div>
		<div class="row">
			<div class="column">
					<div class="doc-example-box">
						column
					</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					column
				</div>
			</div>
			<div class="column">
				<div class="doc-example-box">
					column
				</div>
			</div>
		</div>
	</div>
</div>

### Mix and match

Don't want your columns to simply stack in some grid tiers? Use a combination of different classes for each tier as needed. See the example below for a better idea of how it all works.

<div class="bd-example-row">
<div class="container">
<!-- Stack the columns on mobile by making one full-width and the other half-width -->
<div class="row">
  <div class="column column-tablet-8">
	<div class="doc-example-box">
		.column .column-tablet-8
	</div>
  </div>
  <div class="column column-tablet-4">
	<div class="doc-example-box">
		.column .column-tablet-4
	</div>
  </div>
</div>

<!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
<div class="row">
  <div class="column-6 column-tablet-4">
	<div class="doc-example-box">
		.column-6 .column-tablet-4
	</div>
  </div>
  <div class="column-6 column-tablet-4">
	<div class="doc-example-box">
		.column-6 .column-tablet-4
	</div>
  </div>
  <div class="column-6 column-tablet-4">
	<div class="doc-example-box">
		.column-6 .column-tablet-4
	</div>
  </div>
</div>

<!-- Columns are always 50% wide, on mobile and desktop -->
<div class="row">
  <div class="column-6">
	<div class="doc-example-box">
		.column-6
	</div>
  </div>
  <div class="column-6">
	<div class="doc-example-box">
		.column-6
	</div>
  </div>
</div>
</div>
</div>

## Alignment

Use flexbox alignment utilities to vertically and horizontally align columns.

### Vertical alignment

<div class="bd-example-row bd-example-row-flex-cols">
	<div class="container">
		<div class="row align-items-start" style="min-height: 200px; background-color: rgba(255,0,0,.1);">
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
		</div>
		<div class="row align-items-center" style="min-height: 200px; background-color: rgba(255,0,0,.1); margin-top: 15px;">
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
		</div>
		<div class="row align-items-end" style="min-height: 200px; background-color: rgba(255,0,0,.1); margin-top: 15px;">
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
		</div>
	</div>
</div>

<div class="bd-example-row bd-example-row-flex-cols">
	<div class="container">
		<div class="row" style="min-height: 200px; background-color: rgba(255,0,0,.1); margin-top: 15px;">
			<div class="column-tablet align-self-start">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet align-self-center">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
			<div class="column-tablet align-self-end">
				<div class="doc-example-box">
					One of three columns
				</div>
			</div>
		</div>
	</div>
</div>

### Horizontal alignment

<div class="bd-example-row">
	<div class="container">
		<div class="row justify-content-start">
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
		</div>
		<div class="row justify-content-end">
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
		</div>
		<div class="row justify-content-around">
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
		</div>
		<div class="row justify-content-between">
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					One of two columns
				</div>
			</div>
		</div>
	</div>
</div>

### No gutters

The gutters between columns in our predefined grid classes can be removed with `.no-gutters`. This removes the negative `margin`s from `.row` and the horizontal `padding` from all immediate children columns.

Here's the source code for creating these styles. Note that column overrides are scoped to only the first children columns and are targeted via [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors). While this generates a more specific selector, column padding can still be further customized with [spacing utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/spacing/).

In practice, here's how it looks. Note you can continue to use this with all other predefined grid classes (including column widths, responsive tiers, reorders, and more).

<div class="bd-example-row">
	<div class="container">
		<div class="row no-gutters">
			<div class="column-12 column-tablet-6 column-desktop-8">
				<div class="doc-example-box">
					.column-desktop-12 .column-6 .column-tablet-8
				</div>
			</div>
			<div class="column-6 column-tablet-4">
				<div class="doc-example-box">
					.column-desktop-6 .column-tablet-4
				</div>
			</div>
		</div>
	</div>
</div>

### Column wrapping

If more than 12 columns are placed within a single row, each group of extra columns will, as one unit, wrap onto a new line.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column-9">
				<div class="doc-example-box">
					.column-9
				</div>
			</div>
			<div class="column-4">
				<div class="doc-example-box">
					.column-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.
				</div>
			</div>
			<div class="column-6">
				<div class="doc-example-box">
					.column-6<br>Subsequent columns continue along the new line.
				</div>
			</div>
		</div>
	</div>
</div>

### Column resets

With the handful of grid tiers available, you're bound to run into issues where, at certain breakpoints, your columns don't clear quite right as one is taller than the other. To fix that, use a combination of a `.clearfix` and our [responsive display utilities]({{ site.baseurl }}/docs/{{ site.docs_version }}/utilities/display/).

<div class="bd-example-row">
<div class="container">
<div class="row">
  <div class="column-6 column-tablet-3">
	<div class="doc-example-box">
		.column-6 .column-sm-3
	</div>
  </div>
  <div class="column-6 column-tablet-3">
	<div class="doc-example-box">
		.column-6 .column-sm-3
	</div>
  </div>

  <!-- Add the extra clearfix for only the required viewport -->
  <div class="clearfix d-none d-sm-block"></div>

  <div class="column-6 column-tablet-3">
	<div class="doc-example-box">
		.column-6 .column-sm-3
	</div>
  </div>
  <div class="column-6 column-tablet-3">
	<div class="doc-example-box">
		.column-6 .column-sm-3
	</div>
  </div>
</div>
</div>
</div>

## Reordering

### Flex order

Use `.order-` classes for controlling the **visual order** of your content. These classes are responsive, so you can set the `order` by breakpoint (e.g., `.order-1.order-md-2`). Includes support for `1` through `12` across all five grid tiers.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column order-0">
				<div class="doc-example-box">
					First, but unordered
				</div>
			</div>
			<div class="column order-last">
				<div class="doc-example-box">
					Second, but last
				</div>
			</div>
			<div class="column order-first">
				<div class="doc-example-box">
					Third, but first
				</div>
			</div>
		</div>
	</div>
</div>

### Offsetting columns

With the move to flexbox in v4, we no longer have v3's style of offset classes. Instead, use margin utilities like `.mr-auto` to force sibling columns away from one another.

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column-tablet-4">
				<div class="doc-example-box">
					.column-md-4
				</div>
			</div>
			<div class="column-tablet-4 ml-auto">
				<div class="doc-example-box">
					.column-md-4 .ml-auto
				</div>
			</div>
		</div>
		<div class="row">
			<div class="column-tablet-3 ml-auto mr-auto">
				<div class="doc-example-box">
					.column-md-3 .ml-auto .mr-auto
				</div>  
			</div>
			<div class="column-tablet-3 ml-auto">
				<div class="doc-example-box">
					.column-md-3 .ml-auto
				</div>  
			</div>
		</div>
		<div class="row">
			<div class="column-auto mr-auto">
				<div class="doc-example-box">
					.column-auto .mr-auto
				</div>
			</div>
			<div class="column-auto">
				<div class="doc-example-box">
					.column-auto
				</div>
			</div>
		</div>
	</div>
</div>

## Nesting

To nest your content with the default grid, add a new `.row` and set of `.column-sm-*` columns within an existing `.column-sm-*` column. Nested rows should include a set of columns that add up to 12 or fewer (it is not required that you use all 12 available columns).

<div class="bd-example-row">
	<div class="container">
		<div class="row">
			<div class="column-tablet-9">
				<div class="doc-example-box">
					Level 1: .column-sm-9
				</div>
				<div class="row">
					<div class="column-8 column-tablet-6">
						<div class="doc-example-box">
							Level 2: .column-8 .column-sm-6
						</div>
					</div>
					<div class="column-4 column-tablet-6">
						<div class="doc-example-box">
							Level 2: .column-4 .column-sm-6
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>