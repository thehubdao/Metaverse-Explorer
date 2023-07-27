// Required imports from "lightweight-charts" and "react" libraries
import { IChartApi, ISeriesApi, LineData, Time, UTCTimestamp, WhitespaceData, createChart } from "lightweight-charts";
import { RefObject } from "react";
import { ApiData } from "../interfaces/charts";

//** Class for creating simple linear charts using the "lightweight-charts" library.
export class LightweightLinearChart {
  private _chart: IChartApi
  private _series: { price: ISeriesApi<"Line">, name: string, color: string }[]
  private _formatter: Intl.NumberFormat
  private _symbol: string

  /**
   ** Constructor of the LightweightLinearChart class.
   * @param chartElement A RefObject<HTMLDivElement> object that references the HTML element where the chart will be rendered.
   */
  constructor(chartElement: RefObject<HTMLDivElement>) {
    this._chart = this.initChart(chartElement);
    this._series = [];
    this._formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    this._symbol = 'Eth';
  }

  /**
   ** Private method to initialize the chart with configuration options.
   * @param chartElement A RefObject<HTMLDivElement> object that references the HTML element where the chart will be rendered.
   * @returns An instance of IChartApi representing the created chart.
   */
  private initChart(chartElement: RefObject<HTMLDivElement>) {
    return createChart((chartElement.current ?? ''), {
      width: chartElement.current?.clientWidth ?? 0,
      timeScale: {
        fixLeftEdge: true,
        fixRightEdge: true,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      leftPriceScale: {
        visible: true,
        borderVisible: false,
      },
      layout: {
        background: { color: 'transparent' },
        textColor: "#9B9B9B",
        fontSize: 10, // Tamaño de letra deseado (puedes ajustar el valor según tus necesidades)
      },
      grid: {
        vertLines: {
          color: "transparent",
        },
        horzLines: {
          color: "rgba(101, 101, 101, 0.11)",
        },
      },
    });
  }

  /**
   ** Changes the visible time range of the chart based on the provided number of days.
   * The chart will display data from `days` ago until today.
   *
   * @param days The number of days to show in the chart.
   */
  public ChangeVisibleTimelapsRange(days: number) {
    // Calculate the start date as `days` ago from today
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startTimestamp = Math.floor(startDate.getTime() / 1000) as Time;

    // Calculate the end date as today's date
    const endDate = new Date();
    const endTimestamp = Math.floor(endDate.getTime() / 1000) as Time;

    // Set the visible range of the chart's time scale
    this._chart.timeScale().setVisibleRange({ from: startTimestamp, to: endTimestamp });
  }

  /**
   ** Private method to convert a timestamp to a human-readable date format.
   * @param businessDay A timestamp in numeric format or any other type.
   * @returns A string representing the date in "DD/MM/YYYY" format.
   */
  private businessDayToString(businessDay: number | any) {
    let businessDayDate = new Date(businessDay * 1000)
    return businessDayDate.getDate() + "/" + (businessDayDate.getMonth() + 1) + "/" + businessDayDate.getFullYear()
  }

  /**
   ** Private method to convert a list of prices to a formatted text string.
   * @param prices A list of objects containing information about the prices.
   * @param symbol The symbol used to label the values on the chart.
   * @returns A text string with formatted prices.
   */
  private pricesToString(prices: { price: { time: Time, value: number } | undefined, name: string, color: string }[], symbol: string) {
    let stringToReturn = ''

    prices.map((item) => {
      const formatPrice = this._formatter.format(item.price?.value ?? 0)
      stringToReturn = `${stringToReturn} <p style="font-size: 10px; margin: 1px 0px; color: ${item.color}">${item.name}: ${formatPrice == 'NaN' ? '0.0' : formatPrice} ${symbol}</p>`
    })

    return stringToReturn
  }

  /**
   ** Public method to create and display an interactive tooltip on the chart when the cursor moves over it.
   * @param chartElement A RefObject<HTMLDivElement> object that references the HTML element of the chart.
   */
  public createTooltip(chartElement: RefObject<HTMLDivElement>) {
    if (!chartElement.current) return
    const toolTipWidth = 150;
    const toolTipHeight = 100;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement('div');
    toolTip.setAttribute('style', `width: 166px; height: fit; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`);
    toolTip.style.background = '#F3F6FF';
    toolTip.style.color = 'black';
    //toolTip.style.borderColor = 'rgb(24, 175, 242)';
    toolTip.style.borderRadius = '5px'
    chartElement.current.appendChild(toolTip);

    // update tooltip
    this._chart.subscribeCrosshairMove(param => {
      if (!chartElement.current) return
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartElement.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartElement.current.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = this.businessDayToString(param.time);
        toolTip.style.display = 'block';
        let prices: { price: { time: Time, value: number } | undefined, name: string, color: string }[] = []
        this._series.map((item) => { prices.push({ price: param.seriesData.get(item.price) as { time: Time, value: number } | undefined, name: item.name, color: item.color }) })
        toolTip.innerHTML = `<div style="font-size: 12px; margin: 4px 0px; color: ${'white'}">
          <div style="color: #54575C">${dateStr}</div>
          ${this.pricesToString(prices, this._symbol)}
          </div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > chartElement.current.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > chartElement.current.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      }
    });
  }

  /**
   ** Public method to add a new line to the chart with the provided data.
   * @param data An array of ApiData objects containing data points for the line.
   * @param color A string value representing the color of the line.
   * @param metaverseName A string value representing the name of the line/metaverse.
   */
  public addNewLine(data: ApiData[], color: string, lineName: string) {
    const lineSerie = this._chart.addLineSeries({
      color,
      priceLineVisible: false,
      lastValueVisible: false,
      lineWidth: 1,
    });
    const lineData: (LineData | WhitespaceData)[] = data.sort((a, b) => a.time - b.time).map(item => {
      return { time: parseInt(`${item.time}`) as UTCTimestamp, value: item.data }
    })
    lineSerie.setData(lineData)
    lineSerie.applyOptions({ priceLineVisible: false });
    this._series.push({ price: lineSerie, name: lineName, color: color })
  }

  /**
   ** Public method to resize the chart to fit the width of the provided HTML element.
   * @param chartElement A RefObject<HTMLDivElement> object that references the HTML element of the chart.
   */
  public resize(chartElement: RefObject<HTMLDivElement>) {
    this._chart.applyOptions({ width: chartElement.current?.clientWidth })
  }

  //** Public method to remove the chart and release associated resources.
  public remove() { this._chart.remove(); }

  //** Public method update symbol on chart.
  public updateSymbol(symbol: string) { this._symbol = symbol }
}