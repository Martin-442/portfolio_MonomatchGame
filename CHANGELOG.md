# 1.2
28-06-2021
- »New game« button added
- »New game« button appears if dobble is clicked on one card
- opponents cards transforms to opacity 


# 1.1 
23-06-2021
- CHANGELOG.md added
- color set adjusted
- google font added
- <a> changed to <button>
- add <span> inside <button> to better adjust font position for different fonts 

# 1.0
14-06-2021
Initial feature-set: 
- MirKat Maths "theDoubleAlgorithm.js" creates an array of 57 elements, containing an array of 8 numbers each
- two circles on the screen representing two cards with 8 numbers on each card
- an eventListener "onClick" on each number allows the user to click on any number on both cards
- a click on a number changes the font color
- each click on a number checks if that number is included in the set of numbers of the other card
- while clicking on a number that is present on both cards, the background of the number changes to green and all eventListeners are removed