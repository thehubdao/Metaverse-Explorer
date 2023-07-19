import ChartCurrencyFilterSelector from "../ui/analytics/chartCurrencyFilterSelector.ui";
import ChartGridSelector from "../ui/analytics/chartGridSelector.ui";
import ChartMetaverseFilterSelector from "../ui/analytics/chartMetaverseFilterSelector.ui";
import ChartNameFilterSelector from "../ui/analytics/chartNameFilterSelector.ui";
import ChartTimeFilterSelector from "../ui/analytics/chartTimeFilterSelector.ui";
import LinearChartUI from "../ui/charts/linearChart.ui";
import FooterUI from "../ui/footer.ui";

export default function AnalyticsComponent() {
    return (
        <>
            <div className="w-full px-16 mt-16 text-nm-dm-icons font-bold text-sm">
                <div className="h-12 flex justify-between items-center">
                    <div className="flex gap-6 ">
                        <ChartNameFilterSelector />
                        <ChartMetaverseFilterSelector />
                    </div>
                    <div className="flex gap-6">
                        <ChartCurrencyFilterSelector />
                        <ChartTimeFilterSelector />
                        <ChartGridSelector />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 my-6">
                    {Array.from({ length: 10 }, (_, index) => (
                        <LinearChartUI />
                    ))}
                </div>

            </div>
            <FooterUI />
        </>
    )
}