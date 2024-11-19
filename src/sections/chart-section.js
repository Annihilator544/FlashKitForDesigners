import { SectionTab } from 'polotno/side-panel';
import { LucideChartArea } from 'lucide-react';
import React, { useCallback, useRef } from 'react';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { AreaChartDisplay } from '../components/charts/AreaChartDisplay';
import BarChartDisplay from '../components/charts/BarChartDisplay';
import LineChartDisplay from '../components/charts/LineChartDisplay';
import RadarChartDisplay from '../components/charts/RadarChartDisplay';
import RadialChartDisplay from '../components/charts/RadialChartDisplay';
import html2canvas from 'html2canvas';

const ChartWrapper = observer(({ children, store, name }) => {
  const chartRef = useRef(null);

  const handleClick = useCallback(async () => {
    if (!chartRef.current) return;
    //get chartcontainer from current ref
    const chartContainer = chartRef.current.querySelector('.recharts-wrapper');

    try {
      // Convert the chart to canvas
      const canvas = await html2canvas(chartContainer, {
        backgroundColor: null,
        scale: 2, // Higher resolution
      });

      // Convert canvas to base64 image
      const imageData = canvas.toDataURL('image/png');

      // Get the dimensions of the chart
      const { width, height } = chartRef.current.getBoundingClientRect();

      // Calculate position for the new element
      const { width: pageWidth, height: pageHeight } = store.activePage;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      // Create a new image element on the canvas
      store.activePage?.addElement({
        type: 'image',
        src: imageData,
        x,
        y,
        width,
        height,
        name: `${name} Chart`,
      });
    } catch (error) {
      console.error('Error converting chart to image:', error);
    }
  }, [store, name]);

  return (
    <div 
      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
      onClick={handleClick}
      ref={chartRef}
    >
      {children}
    </div>
  );
});

export const ChartSection = {
  name: 'chart',
  Tab: (props) => (
    <SectionTab name="Charts" {...props}>
      <LucideChartArea />
    </SectionTab>
  ),
  Panel: observer(({ store }) => {
    return (
      <div className="overflow-y-auto h-full flex flex-col gap-2 p-2">
        <ChartWrapper store={store} name="Area">
          <AreaChartDisplay />
        </ChartWrapper>
        <ChartWrapper store={store} name="Bar">
          <BarChartDisplay />
        </ChartWrapper>
        <ChartWrapper store={store} name="Line">
          <LineChartDisplay />
        </ChartWrapper>
        <ChartWrapper store={store} name="Radar">
          <RadarChartDisplay />
        </ChartWrapper>
        <ChartWrapper store={store} name="Radial">
          <RadialChartDisplay />
        </ChartWrapper>
      </div>
    );
  }),
};