'=================================================================================================================================================================================
'	Note that the demo application has the text "Available" on both the left frame, list of products, and in the middle, advertisement frame.
'		This is why we're using micFromLeft rather than miFromTop, because some categories will have the 2nd available product below the advertisement frame products
'=================================================================================================================================================================================
Dim Category, CategoryListHeader												'Initialize the variables to be used to enable data driving

Category = DataTable.GlobalSheet.GetParameter("Categories")						'Set the value for the Category that will be clicked on
CategoryListHeader = "< " & DataTable.GlobalSheet.GetParameter("Categories")	'Set the value for the Category header in the list of products
Browser("Shopping Cart").ClearCache												'Clear the browser cache, the application sometimes gets pushed changes that require a clear cache
Browser("Shopping Cart").Navigate ("https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html")	'Navigate to the application
Browser("Shopping Cart").Maximize												'Maximize the browser or the objects won't be visible
AIUtil.SetContext Browser("Shopping Cart")										'Instruct the AI SDK to start working against the browser
AIUtil.FindTextBlock(Category).Click											'Click the value in the datasheet in the category menu, originally created with the Laptops category
AIUtil.FindTextBlock("Available", micFromLeft, 1).Click							'Click on the first available product 
AIUtil.FindTextBlock("Available", micFromLeft, 2).Click							'Click on the second available product
AIUtil("button", "Add to Cart").Click											'Click on the Add to Cart button.
AIUtil("shopping_cart").Click													'Click the shopping cart icon
AIUtil.FindTextBlock(CategoryListHeader).Click 50, 1							'Click on the text of the category header to allow the application to catch up, could replace with a .Highlight
AIUtil("pencil").Click															'Click the edit icon, shaped like a pencile
AIUtil.FindTextBlock(CategoryListHeader).Click 50, 1							'Click on the text of the category header to allow the application to catch up, could replace with a .Highlight
Browser("Shopping Cart").Maximize												'Maximize the browser or the objects won't be visible
AIUtil("close").Click															'Click the delete button for the first item in the cart, script assumes there is only one item in the cart
AIUtil("button", "Delete").Click												'Click the Delete button in the pop-up frame
AIUtil.FindTextBlock("Save Changes").Click										'Click the Save Changes in the cart slide out frame
AIUtil("left_triangle", micNoText, micFromTop, 1).Click							'Click the arrow next to the category header to move back to the main categories page
AIUtil("button", "").Click														'Click the cart icon to collapse the shopping cart slide out frame.
Browser("Shopping Cart").Close													'Close the browser window

