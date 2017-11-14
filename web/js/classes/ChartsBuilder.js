class ChartsBuilder{
  constructor(domainId, locationId, typeView, minTime, maxTime){
    const CLASS_TTFB_CHART_CONTAINER = '.ct-chart1';
    const CLASS_DOC_TIME_CHART_CONTAINER = '.ct-chart2';
    const CLASS_FULLY_LOAD_TIME_CHART_CONTAINER = '.ct-chart3';

    const ASIX_Y_TITLE_TTFB_CHART = 'TTFB (ms)';
    const ASIX_Y_TITLE_DOC_TIME_CHART = 'Document Complete (ms)';
    const ASIX_Y_TITLE_FULLY_LOAD_TIME_CHART = 'Fully Load Time (ms)';

    let chartsDataProvider = new ChartsDataProvider(domainId, locationId, typeView, minTime, maxTime);
    let chartsClient = new ChartistClient();

    let callbackInterval = setInterval(function() {
      if (chartsDataProvider.subArray) {
        chartsClient.buildChart(CLASS_TTFB_CHART_CONTAINER, chartsDataProvider.time, chartsDataProvider.ttfb, chartsDataProvider.domainUrls, ASIX_Y_TITLE_TTFB_CHART);
        chartsClient.buildChart(CLASS_DOC_TIME_CHART_CONTAINER, chartsDataProvider.time, chartsDataProvider.docTime, chartsDataProvider.domainUrls, ASIX_Y_TITLE_DOC_TIME_CHART);
        chartsClient.buildChart(CLASS_FULLY_LOAD_TIME_CHART_CONTAINER, chartsDataProvider.time, chartsDataProvider.fullyLoaded, chartsDataProvider.domainUrls, ASIX_Y_TITLE_FULLY_LOAD_TIME_CHART);
        clearInterval(callbackInterval);
      }
    }, 200);
  }
}