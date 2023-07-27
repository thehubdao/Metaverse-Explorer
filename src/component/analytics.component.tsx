'use client' // This is a client component 👈🏽

import { useEffect, useState } from "react";
import { CHART_ROUTES, generateTestApiData } from "../utils/analyticsChart";

import FooterUI from "../ui/footer.ui";
import AnalyticsUI from "../ui/analytics/analytics.ui";
import { AnalyticChartData } from "../interfaces/charts";

export default function AnalyticsComponent() {
  // State to hold the fetched analytics data for different charts
  const [analyticsData, setAnalyticsData] = useState<AnalyticChartData[]>([]);

  useEffect(() => {
    // Function to fetch data from APIs and update the state
    const fetch = async () => {
      // TODO: The generateTestApiData function should be changed to one that brings real data from the api.
      const DataToBeReturned: AnalyticChartData[] = await Promise.all(
        // Fetch data for each chart using map and Promise.all
        CHART_ROUTES.map(async (chart) => {
          // Fetch data for sandbox platform
          const sandboxFetch = await generateTestApiData(1000, chart[1].route).then((API_DATA) => {
            return { API_DATA, status: 'ready' }
          }).catch(error => {
            return { API_DATA: [], status: 'error' }
          })

          // Fetch data for decentraland platform
          const decentralandFetch = await generateTestApiData(1000, chart[1].route).then((API_DATA) => {
            return { API_DATA, status: 'ready' }
          }).catch(error => {
            return { API_DATA: [], status: 'error' }
          })

          // Fetch data for somnium space platform
          const somniumSpaceFetch = await generateTestApiData(1000, chart[1].route).then((API_DATA) => {
            return { API_DATA, status: 'ready' }
          }).catch(error => {
            return { API_DATA: [], status: 'error' }
          })

          // Combine data for all platforms into a single object
          const data = {
            'sandbox': sandboxFetch.API_DATA,
            'decentraland': decentralandFetch.API_DATA,
            'somnium-space': somniumSpaceFetch.API_DATA
          }

          // Return the aggregated data for the chart
          return {
            chartEnum: chart[0],
            route: chart[1].route,
            label: chart[1].label,
            description: chart[1].description,
            data,
            status: [sandboxFetch.status, decentralandFetch.status, somniumSpaceFetch.status].includes('error') ? 'error' : 'ready'
          }
        })
      )
      // Update the state with the fetched data
      setAnalyticsData(DataToBeReturned)
    }

    // Fetch the data when the component mounts
    fetch();
  }, [])

  return (
    <>
      {/* Render the AnalyticsUI component with the fetched analyticsData */}
      <AnalyticsUI analyticsData={analyticsData} />
      {/* Render the FooterUI component */}
      <FooterUI />
    </>
  )
}
