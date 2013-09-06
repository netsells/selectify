#Selectify

Selectify is a jQuery plugin to allow the styling of Form `<select>` elements.

##Installation
Just like any other jQuery plugin.

##Usage
Make all the selects fancy `$('select').selectify();`

Make the select where id="fancy-me" `$("#fancy-me").selectify();`

##Options
containerDiv (Default: selectifyContainer)

currentItem (Default: currentItem)

width (Default: 250px)

arrowContainer (Defaint: arrowContainer)

arrowCharacter (Default: \\\/)

##Additional Options
###Disabled elements
If the `<option>` is disabled, this item will not be clickable on the fancy select.

###Override width per select
Suppose you have one (or a few) `<select>` elements on a page that you want to be wider than others, instead of adding multiple `.selectify()` calls, simply add `data-width="350"` to the ul element. 

Example: `<select name="drink" data-width="250">`