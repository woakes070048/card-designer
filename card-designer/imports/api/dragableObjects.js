export const dragerObject = {
	createDragObject: function(insertPosition, objId, type){
			if(type=="dragable_rect"){
				$("#container").append('<div id="drag-1" class="draggable"><p> with each pointer </p></div>');
			}
	},
	addProperties: function(objectId, Property){
		
	}
	
	
}
export const initVal = {'rects':[3, 6], 'circles':[1]};