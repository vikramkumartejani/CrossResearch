import NowcastCard from './NowcastCard'

const DRIVERS = [
    { label: 'Consumer Spending',  value: '+1.6', positive: true  },
    { label: 'Business Investment', value: '+0.5', positive: true  },
    { label: 'Net Exports',         value: '-0.3', positive: false },
    { label: 'Government',          value: '+5.6', positive: true  },
]

const CARDS = [
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+3.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Ui', quarter: 'Second Quarter', vsConsensus: '+2.2 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
    { region: 'Us', quarter: 'Second Quarter', vsConsensus: '+2.3 Vs', vsConsensusPositive: true,  indicator: 'Real GDP', value: '4.5', unit: '%QoQ SASR', nowcast: 4.3, consensus: 2.1, prior: 3.1, inRange: '8/8', drivers: DRIVERS, confidence: 74 },
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
