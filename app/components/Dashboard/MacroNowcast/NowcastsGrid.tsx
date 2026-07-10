import NowcastCard from './NowcastCard'

const CARDS = [
    {
        region: 'US', quarter: 'Second Quarter',
        vsConsensus: '+2.2 Vs', vsConsensusPositive: true,
        indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR',
        nowcast: 4.3, consensus: 2.1, prior: 3.1,
        inRange: '5/8',
        drivers: [
            { label: 'Consumer Spending',   value: '+1.6', positive: true  },
            { label: 'Business Investment', value: '+0.5', positive: true  },
            { label: 'Net Exports',         value: '-0.3', positive: false },
            { label: 'Government',          value: '+5.6', positive: true  },
        ],
        confidence: 74,
    },
    {
        region: 'EU', quarter: 'Second Quarter',
        vsConsensus: '-0.4 Vs', vsConsensusPositive: false,
        indicator: 'Core CPI', value: '3.2', unit: '%YoY',
        nowcast: 3.1, consensus: 3.5, prior: 3.8,
        inRange: '5/8',
        drivers: [
            { label: 'Services Inflation',  value: '+2.1', positive: true  },
            { label: 'Energy Prices',       value: '-0.8', positive: false },
            { label: 'Food & Beverages',    value: '+0.6', positive: true  },
            { label: 'Goods Inflation',     value: '+0.4', positive: true  },
        ],
        confidence: 68,
    },
    {
        region: 'US', quarter: 'First Quarter',
        vsConsensus: '+1.8 Vs', vsConsensusPositive: true,
        indicator: 'PCE Deflator', value: '2.8', unit: '%YoY',
        nowcast: 2.9, consensus: 1.1, prior: 2.6,
        inRange: '7/8',
        drivers: [
            { label: 'Housing Services',    value: '+1.2', positive: true  },
            { label: 'Medical Care',        value: '+0.4', positive: true  },
            { label: 'Transportation',      value: '-0.2', positive: false },
            { label: 'Recreation',          value: '+0.3', positive: true  },
        ],
        confidence: 81,
    },
    {
        region: 'UK', quarter: 'Second Quarter',
        vsConsensus: '-1.1 Vs', vsConsensusPositive: false,
        indicator: 'Unemployment', value: '4.2', unit: '%',
        nowcast: 4.4, consensus: 5.5, prior: 4.0,
        inRange: '5/8',
        drivers: [
            { label: 'Youth Unemployment',  value: '+0.8', positive: false },
            { label: 'Part-Time Workers',   value: '+0.3', positive: false },
            { label: 'Long-Term Unemp.',    value: '-0.1', positive: true  },
            { label: 'Job Vacancies',       value: '-0.4', positive: false },
        ],
        confidence: 61,
    },
    {
        region: 'US', quarter: 'Second Quarter',
        vsConsensus: '+3.1 Vs', vsConsensusPositive: true,
        indicator: 'ISM Manufacturing', value: '52.4', unit: 'Index',
        nowcast: 52.8, consensus: 49.7, prior: 50.3,
        inRange: '8/8',
        drivers: [
            { label: 'New Orders',          value: '+2.4', positive: true  },
            { label: 'Production',          value: '+1.7', positive: true  },
            { label: 'Employment',          value: '-0.6', positive: false },
            { label: 'Supplier Delivery',   value: '+0.8', positive: true  },
        ],
        confidence: 79,
    },
    {
        region: 'JP', quarter: 'Second Quarter',
        vsConsensus: '-0.7 Vs', vsConsensusPositive: false,
        indicator: 'Trade Balance', value: '-¥1.2T', unit: 'JPY',
        nowcast: -1.4, consensus: -0.7, prior: -0.9,
        inRange: '4/8',
        drivers: [
            { label: 'Auto Exports',        value: '-1.8', positive: false },
            { label: 'Energy Imports',      value: '+2.1', positive: false },
            { label: 'Electronics',         value: '+0.6', positive: true  },
            { label: 'Food Imports',        value: '+0.4', positive: false },
        ],
        confidence: 55,
    },
    {
        region: 'US', quarter: 'Second Quarter',
        vsConsensus: '+2.5 Vs', vsConsensusPositive: true,
        indicator: 'Nonfarm Payrolls', value: '242K', unit: 'MoM',
        nowcast: 248, consensus: 198, prior: 227,
        inRange: '7/8',
        drivers: [
            { label: 'Leisure & Hospitality', value: '+52K', positive: true  },
            { label: 'Healthcare',            value: '+38K', positive: true  },
            { label: 'Manufacturing',         value: '-12K', positive: false },
            { label: 'Government',            value: '+18K', positive: true  },
        ],
        confidence: 83,
    },
    {
        region: 'CN', quarter: 'Second Quarter',
        vsConsensus: '+1.4 Vs', vsConsensusPositive: true,
        indicator: 'Retail Sales', value: '6.8', unit: '%YoY',
        nowcast: 7.1, consensus: 5.7, prior: 5.5,
        inRange: '6/8',
        drivers: [
            { label: 'Online Sales',        value: '+3.2', positive: true  },
            { label: 'Auto Sales',          value: '+1.4', positive: true  },
            { label: 'Catering Services',   value: '+0.9', positive: true  },
            { label: 'Luxury Goods',        value: '-0.5', positive: false },
        ],
        confidence: 71,
    },
]

export default function NowcastsGrid() {
    return (
        <div className="mb-5">
            <h2 className="text-white text-[18px] font-medium leading-[22px] mb-2">Nowcasts</h2>
            <p className="text-[#838388] text-[14px] leading-[20px] mb-4">
                Model-driven current-quarter / current-period estimates vs consensus
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CARDS.map((card, i) => (
                    <NowcastCard key={i} {...card} />
                ))}
            </div>
        </div>
    )
}
