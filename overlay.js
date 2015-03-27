(function() {

angular.module('gb.Overlay', [])
	.directive('gbOverlay', gbOverlay);

var DEFAULT_BACKDROP_COLOR = '#000',
    DEFAULT_BACKDROP_OPACITY = 0.1,
    DEFAULT_Z_INDEX = 10;

function gbOverlay() { // Element directive
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      condition:'&',
      backdrop:'&',
      zIndex:'&'
    },
    link: function(scope,element,attrs,controller,transcludeFn) {
      var overlayTarget = element.parent();
      var overlayWrapper = makeOverlayWrapper();
      var overlayContent = makeOverlayContent();
      var overlayBackground = makeOverlayBackground();
      overlayTarget.append(overlayWrapper);
      overlayWrapper.append(overlayBackground);
      overlayWrapper.append(overlayContent);
      
      transcludeFn(function(clone,scope){
        overlayContent.append(clone);
      },overlayContent);
      
      scope.$watch('condition()',function(val) {
        if (val)
          overlayWrapper.css('display','block');
        else
          overlayWrapper.css('display','none');
      });
      scope.$watch('backdrop().opacity',function(val) {
        val = val || DEFAULT_BACKDROP_OPACITY;
        overlayBackground.css('opacity',val);
      });
      scope.$watch('backdrop().color',function(val) {
        val = val || DEFAULT_BACKDROP_COLOR;
        overlayBackground.css('background-color',val);
      });
      scope.$watch('zIndex()',function(val) {
        val = val || DEFAULT_Z_INDEX;
        overlayWrapper.css('z-index',val);
      });
    }
  };
}

makeOverlayWrapper = function makeOverlayWrapper() {
	var overlayWrapper = angular.element('<div></div>');
	overlayWrapper.css('position','absolute');
	overlayWrapper.css('display','none');
	overlayWrapper.css('top','0');
	overlayWrapper.css('left','0');
	overlayWrapper.css('width','100%');
	overlayWrapper.css('height','100%');
	overlayWrapper.addClass('overlay-wrapper');
	overlayWrapper.css('text-align','center');
	return overlayWrapper;
}
makeOverlayBackground = function makeOverlayBackground() {
	var overlayBackground = angular.element('<div></div>');
	overlayBackground.css('position','absolute');
	overlayBackground.css('display','block');
	overlayBackground.css('top','0');
	overlayBackground.css('left','0');
	overlayBackground.css('width','100%');
	overlayBackground.css('height','100%');
	return overlayBackground;
}
makeOverlayContent = function makeOverlayContent() {
	var overlayContent = angular.element('<div></div>');
	overlayContent.css('display','inline-block');
	overlayContent.css('position','relative');
	overlayContent.css('top','50%');
	overlayContent.css('margin-left','auto');
	overlayContent.css('margin-right','auto');
	overlayContent.css('transform','translateY(-50%)');
	overlayContent.addClass('overlay-content');
	return overlayContent;
}
	
})();

