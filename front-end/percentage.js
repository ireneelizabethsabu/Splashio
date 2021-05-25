var fm = new FluidMeter();
fm.init({
    targetContainer: document.getElementById("fluid-meter"),
    fillPercentage: 0,
    options: {
      fontSize: "70px",
      fontFamily: "Arial",
      fontFillStyle: "white",
      drawShadow: true,
      drawText: true,
      drawPercentageSign: true,
      drawBubbles: true,
      size: 400,
      borderWidth: 20,
      backgroundColor: "#e2e2e2",
      foregroundColor: "#fafafa",
      foregroundFluidLayer: {
        fillStyle: "#06a0e8",
        angularSpeed: 100,
        maxAmplitude: 12,
        frequency: 30,
        horizontalSpeed: -150
    },
    backgroundFluidLayer: {
      fillStyle: "#C3EBFD",
      angularSpeed: 100,
      maxAmplitude: 9,
      frequency: 30,
      horizontalSpeed: 150
    }
  }
});

fm.setPercentage(parseInt(window.localStorage.getItem('amount')));
