# gb-overlay

The content of the directive will be transcluded into a centered div inside the overlay.

Because of how CSS positioning works, the overlay will actually show over the first positioned element above it in the DOM.

Example:

``` html
<div style="position:relative">
  <gb-overlay
    z-index="100"
    backdrop="{color:'#F00', opacity:'0.5'}"
    condition="loading">
    <h3>This will show in the middle of the overlay</h3>
  </gb-overlay>
  <p>This will show under very thick red overlay whenever $scope.loading is truthy.</p>
</div>
```

If not specified:
* backdrop.color defaults to '#000'
* backdrop.opacity defaults to 0.1
* z-index defaults to 10

# license

MIT
