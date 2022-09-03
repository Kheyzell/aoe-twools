import React from "react"
import { useDispatch, useSelector } from "react-redux"

import BonusLine from "../../components/bonus/bonus-line/bonus-line.component"
import TechComponent, { BoxSize } from "../../components/tech/tech.component"
import { allCivTechTrees, aztecsUniqueUnits, bengalisUniqueUnits, berbersUniqueUnits, britonsUniqueUnits, bulgariansUniqueUnits, burgundiansUniqueUnits, burmeseUniqueUnits, byzantinesUniqueUnits, celtsUniqueUnits, chineseUniqueUnits, cumansUniqueUnits, ethiopiansUniqueUnits, franksUniqueUnits, gothsUniqueUnits, hunsUniqueUnits, italiansUniqueUnits, japaneseUniqueUnits, khmerUniqueUnits, koreansUniqueUnits, lithuaniansUniqueUnits, magyarsUniqueUnits, malayUniqueUnits, maliansUniqueUnits, mayansUniqueUnits, mongolsUniqueUnits, persiansUniqueUnits, portugeseUniqueUnits, saracensUniqueUnits, siciliansUniqueUnits, slavsUniqueUnits, spanishUniqueUnits, tatarsUniqueUnits, teutonsUniqueUnits, turksUniqueUnits, vikingsUniqueUnits } from "../../constants"
import { archeryUnits } from "../../constants/techs/archery-techs.const"
import { barracksUnits } from "../../constants/techs/barracks-techs.const"
import { castleUnits } from "../../constants/techs/castle-techs.const"
import { dockUnits } from "../../constants/techs/dock-techs.const"
import { marketUnits } from "../../constants/techs/market-techs.const"
import { monasteryUnits } from "../../constants/techs/monastery-techs.const"
import { siegeUnits } from "../../constants/techs/siege-techs.const"
import { stableUnits } from "../../constants/techs/stable-techs.const"
import { townCenterUnits } from "../../constants/techs/town-center-techs.const"
import { Bonus } from "../../models/bonus.model"
import { getChainedUnits, getChainedUpgrades, rechainUpgradesInList } from "../../utils/techs.utils"
import { SeparatorLine, StatsContainer, TitleLine } from "./stats-lines/basic-stats-components/basic-stats-components"
import { ConversionLine, DamagePerHitLine, DamagePerSecondLine, DamagePerSecondWithAccuratyLine, HealthRemainingLine, MonkHealingLine, NumberOfHitToKillLine, ResourcesLostLine, ResourcesPerHitLine, ResourcesPerSecondLine, TimeNeededToKillLine } from "./stats-lines/calculated-stats-components"
import { AccuracyLine, ArmorLine, AttackDamageLine, AttackRateLine, CapacitiesLine, ContinuousProductionLine, CostLine, HealthLine, LineOfSightLine, MovementSpeedLine, RangeLine, SecondaryAttackDamageLine, TrainingTimeLine } from "./stats-lines/static-stats-lines"
import UnitCalculatorUnitComponent from "./unit-calculator-tech/unit-calculator-unit.component"
import UnitCalculatorUpgradeComponent from "./unit-calculator-upgrade/unit-calculator-upgrade.component"
import { selectBonusForUnit1, selectBonusForUnit2, selectedBonusesForUnit1Selector, selectedBonusesForUnit2Selector, selectedUnitsSelector, selectedUpgradesForUnit1Selector, selectedUpgradesForUnit2Selector, selectUnit1, selectUnit2, selectUpgradesForUnit1, selectUpgradesForUnit2 } from "./unit-calculator.slice"
import { Unit } from "../../models/unit.model"
import { Upgrade } from "../../models/upgrade.model"
import { bohemiansUniqueUnits } from "../../constants/tech-trees/bohemians-tech-tree.const"

import "./unit-calculator.component.css"
import parchmentBackground2 from "../../resources/images/backgrounds/parchment.jpg"
import parchmentBackground from "../../resources/images/backgrounds/parchment7.jpg"
import woodenBackground from "../../resources/images/backgrounds/wood4.jpg"
import { incasUniqueUnits } from "../../constants/tech-trees/incas-tech-tree.const"
import { hindustanisUniqueUnits } from "../../constants/tech-trees/hindustanis-tech-tree.const"
import { polesUniqueUnits } from "../../constants/tech-trees/poles-tech-tree.const"
import { vietnameseUniqueUnits } from "../../constants/tech-trees/vietnamese-tech-tree.const"
import { dravidiansUniqueUnits } from "../../constants/tech-trees/dravidians-tech-tree.const"


type UnitCalculatorProps = {}

const UnitCalculator: React.FC<UnitCalculatorProps> = () => {
    const dispatch = useDispatch()
    const { unit1, unit2 } = useSelector(selectedUnitsSelector)
    const selectedUnit1Upgrades = useSelector(selectedUpgradesForUnit1Selector)
    const selectedUnit2Upgrades = useSelector(selectedUpgradesForUnit2Selector)
    const selectedUnit1Bonuses = useSelector(selectedBonusesForUnit1Selector)
    const selectedUnit2Bonuses = useSelector(selectedBonusesForUnit2Selector)

    const onUnit1Click = (unit: Unit) => {
        dispatch(selectUnit1(unit))
    }
    
    const onUnit2Click = (unit: Unit) => {
        dispatch(selectUnit2(unit))
    }

    const onUpgrade1Click = (upgrade: Upgrade) => {
        dispatch(selectUpgradesForUnit1(upgrade))
    }
    
    const onUpgrade2Click = (upgrade: Upgrade) => {
        dispatch(selectUpgradesForUnit2(upgrade))
    }
    
    const onBonusClick1 = (bonus: Bonus) => {
        dispatch(selectBonusForUnit1(bonus))
    }
    
    const onBonusClick2 = (bonus: Bonus) => {
        dispatch(selectBonusForUnit2(bonus))
    }

    const units = [
        new Unit({ ...barracksUnits.champion }), new Unit({ ...barracksUnits.halberdier }), new Unit({ ...barracksUnits.eliteEagleWarrior }),
        new Unit({ ...archeryUnits.arbalester }), new Unit({ ...archeryUnits.eliteSkirmisher }), new Unit({ ...archeryUnits.handCannoneer }), new Unit({ ...archeryUnits.heavyCavalryArcher }), new Unit({ ...archeryUnits.eliteElephantArcher }),
        new Unit({ ...stableUnits.hussar }), new Unit({ ...stableUnits.wingedHussar }), new Unit({ ...stableUnits.paladin }), new Unit({ ...stableUnits.heavyCamelRider }), new Unit({ ...stableUnits.eliteBattleElephant }), new Unit({ ...stableUnits.eliteSteppeLancer }),
        new Unit({ ...siegeUnits.siegeRam }), new Unit({ ...siegeUnits.siegeElephant }), new Unit({ ...siegeUnits.siegeOnager }), new Unit({ ...siegeUnits.heavyScorpion }), new Unit({ ...siegeUnits.siegeTower }), new Unit({ ...siegeUnits.bombardCannon }),
        new Unit({ ...castleUnits.petard }), new Unit({ ...castleUnits.trebuchet }),
        new Unit({ ...monasteryUnits.monk }),
        new Unit({ ...townCenterUnits.villager }),
        new Unit({ ...marketUnits.tradeCart }),
        new Unit({ ...dockUnits.fishingShip }), new Unit({ ...dockUnits.transportShip }), new Unit({ ...dockUnits.tradeCog }), new Unit({ ...dockUnits.galleon }), new Unit({ ...dockUnits.fastFireShip }), new Unit({ ...dockUnits.heavyDemolitionShip }), new Unit({ ...dockUnits.eliteCannonGalleon }),
    ]
    const uniqueUnits = [
        new Unit({ ...aztecsUniqueUnits.eliteJaguarWarrior }),
        new Unit({ ...bengalisUniqueUnits.eliteRathaRanged }),
        new Unit({ ...berbersUniqueUnits.eliteCamelArcher }), new Unit({ ...berbersUniqueUnits.eliteGenitour }),
        new Unit({ ...bohemiansUniqueUnits.eliteHussiteWagon }), new Unit({ ...bohemiansUniqueUnits.houfnice }),
        new Unit({ ...britonsUniqueUnits.eliteLongbowman }),
        new Unit({ ...bulgariansUniqueUnits.eliteKonnik }),
        new Unit({ ...burgundiansUniqueUnits.eliteCoustillier }), new Unit({ ...burgundiansUniqueUnits.flemishMilitia }),
        new Unit({ ...burmeseUniqueUnits.eliteArambai }),
        new Unit({ ...byzantinesUniqueUnits.eliteCataphract }),
        new Unit({ ...celtsUniqueUnits.eliteWoadRaider }),
        new Unit({ ...chineseUniqueUnits.eliteChukonu }),
        new Unit({ ...cumansUniqueUnits.eliteKipchak }),
        new Unit({ ...dravidiansUniqueUnits.eliteUrumiSwordsman }), new Unit({ ...dravidiansUniqueUnits.thirisadai }),
        new Unit({ ...ethiopiansUniqueUnits.eliteShotelWarrior }),
        new Unit({ ...franksUniqueUnits.eliteThrowingAxeman }),
        new Unit({ ...gothsUniqueUnits.eliteHuskarl }),
        new Unit({ ...hindustanisUniqueUnits.eliteGhulam }), new Unit({ ...hindustanisUniqueUnits.imperialCamelRider }),
        new Unit({ ...hunsUniqueUnits.eliteTarkan }),
        new Unit({ ...incasUniqueUnits.eliteKamayuk }), new Unit({ ...incasUniqueUnits.slinger }),
        new Unit({ ...italiansUniqueUnits.eliteGenoeseCrossbowman }), new Unit({ ...italiansUniqueUnits.condottiero }),
        new Unit({ ...japaneseUniqueUnits.eliteSamurai }),
        new Unit({ ...khmerUniqueUnits.eliteBallistaElephant }),
        new Unit({ ...koreansUniqueUnits.eliteWarWagon }), new Unit({ ...koreansUniqueUnits.eliteTurtleShip }),
        new Unit({ ...lithuaniansUniqueUnits.eliteLeitis }),
        new Unit({ ...magyarsUniqueUnits.eliteMagyarHuszar }),
        new Unit({ ...malayUniqueUnits.eliteKarambitWarrior }),
        new Unit({ ...maliansUniqueUnits.eliteGbeto }),
        new Unit({ ...mayansUniqueUnits.elitePlumedArcher }),
        new Unit({ ...mongolsUniqueUnits.eliteMangudai }),
        new Unit({ ...persiansUniqueUnits.eliteWarElephant }),
        new Unit({ ...polesUniqueUnits.eliteObuch }),
        new Unit({ ...portugeseUniqueUnits.eliteOrganGun }), new Unit({ ...portugeseUniqueUnits.eliteCaravel }),
        new Unit({ ...saracensUniqueUnits.eliteMameluke }),
        new Unit({ ...siciliansUniqueUnits.eliteSerjeant }),
        new Unit({ ...slavsUniqueUnits.eliteBoyar }),
        new Unit({ ...spanishUniqueUnits.eliteConquistador }), new Unit({ ...spanishUniqueUnits.missionary }),
        new Unit({ ...tatarsUniqueUnits.eliteKeshik }), new Unit({ ...tatarsUniqueUnits.flamingCamel }),
        new Unit({ ...teutonsUniqueUnits.eliteTeutonicKnight }),
        new Unit({ ...turksUniqueUnits.eliteJanissary }),
        new Unit({ ...vietnameseUniqueUnits.eliteRattanArcher }), new Unit({ ...vietnameseUniqueUnits.imperialSkirmisher }),
        new Unit({ ...vikingsUniqueUnits.eliteBerserk }), new Unit({ ...vikingsUniqueUnits.eliteLongboat })
    ]

    const uniqueTechs = allCivTechTrees.map(civ => civ.uniqueTechs)
    const unit1AffectingUniqueTechs = uniqueTechs.map(upgrades => upgrades.filter(u => !!u.affectedUnits.find(unit => unit.id === unit1.id))).filter(upgrades => !!upgrades.length)
    const unit2AffectingUniqueTechs = uniqueTechs.map(upgrades => upgrades.filter(u => !!u.affectedUnits.find(unit => unit.id === unit2.id))).filter(upgrades => !!upgrades.length)

    const unit1UpgradeLines = rechainUpgradesInList(unit1.affectingUpgrades || [])
    const unit2UpgradeLines = (unit2.affectingUpgrades || []).filter(upgrade => !upgrade.previousLineTech).map(upgrade => getChainedUpgrades(upgrade).filter(up => (unit2.affectingUpgrades || []).find(u => u.id === up.id)))
    
    const allBonuses = allCivTechTrees
        .map(civ => civ.bonuses)
        .reduce((allBonuses: Bonus[], civBonuses: Bonus[]) => allBonuses.concat(civBonuses), [])

    const unit1AffectingBonuses = allBonuses.filter(bonus => bonus.affectedUnits.some(u => u.id === unit1.id))
    const unit2AffectingBonuses = allBonuses.filter(bonus => bonus.affectedUnits.some(u => u.id === unit2.id))

    return (
        <div className="UnitCalculator" style={{ background: `url(${parchmentBackground2})` }}>
            <div className="UnitLists">
                <div className="UnitList" style={{ background: `url(${woodenBackground})` }}>
                    {
                        units.map(unit => (
                            <UnitCalculatorUnitComponent key={unit.id} unit={unit} onClick={onUnit1Click} onRightClick={onUnit2Click} size={BoxSize.mini}></UnitCalculatorUnitComponent>
                        ))
                    }
                </div>
                <div className="UnitList" style={{ background: `url(${woodenBackground})` }}>
                    {
                        uniqueUnits.map(unit => (
                            <UnitCalculatorUnitComponent key={unit.id} unit={unit} onClick={onUnit1Click} onRightClick={onUnit2Click} size={BoxSize.mini}></UnitCalculatorUnitComponent>
                        ))
                    }
                </div>
            </div>

            <div className="Main">
                <div className="SelectedUnitLine">
                    {
                        getChainedUnits(unit1).map(unit => (
                            <UnitCalculatorUnitComponent key={unit.id} unit={unit} onClick={onUnit1Click} size={BoxSize.mini}></UnitCalculatorUnitComponent>
                        ))
                    }
                </div>
                <div className="Upgrades Upgrades1">
                    {
                        unit1UpgradeLines.map((line, i) => {
                            return (<div key={i} className="UpgradeLine">
                                {line.map(upgrade => (<UnitCalculatorUpgradeComponent key={upgrade.id} upgrade={upgrade} size={BoxSize.mini}
                                    isSelected={!!selectedUnit1Upgrades.find(u => u.id === upgrade.id)} onClick={onUpgrade1Click}></UnitCalculatorUpgradeComponent>))}
                            </div>)
                        })
                    }
                    {
                        unit1AffectingUniqueTechs.map((line, i) => {
                            return (<div key={i} className="UpgradeLine">
                                {line.map(upgrade => (<UnitCalculatorUpgradeComponent key={upgrade.id} upgrade={upgrade} size={BoxSize.mini}
                                    isSelected={!!selectedUnit1Upgrades.find(u => u.id === upgrade.id)} onClick={onUpgrade1Click}></UnitCalculatorUpgradeComponent>))}
                            </div>)
                        })
                    }
                    <div className="BonusList">
                        {
                            unit1AffectingBonuses.map(bonus => {
                                const isSelected = selectedUnit1Bonuses.some(b => b.id === bonus.id)
                                return (<div onClick={() => onBonusClick1(bonus)} className={isSelected ? 'Selected' : ''}>
                                    <BonusLine key={bonus.id} bonus={bonus} displayCivCrest={true} displayTeamBonus={true} hideTooltip={true}></BonusLine>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className="Stats" style={{ background: `url(${parchmentBackground})` }}>
                    <StatsContainer class="CalculatedStats">
                        <tr className="SelectedUnitsClass">
                            <td> <TechComponent classes={['ImageInverted']} tech={unit1} isSelected={true}></TechComponent> </td>
                            <td></td>
                            <td> <TechComponent tech={unit2} isSelected={true} classes={['Selected2']}></TechComponent> </td>
                        </tr>
                        <TitleLine> Calculated Stats </TitleLine>
                        <DamagePerHitLine></DamagePerHitLine>
                        <DamagePerSecondLine></DamagePerSecondLine>
                        <DamagePerSecondWithAccuratyLine></DamagePerSecondWithAccuratyLine>
                        <NumberOfHitToKillLine></NumberOfHitToKillLine>
                        {/* <NumberOfUnitsNeededToKill></NumberOfUnitsNeededToKill> */}
                        <TimeNeededToKillLine></TimeNeededToKillLine>
                        {/* <TimeNeededToComeInRangeLine></TimeNeededToComeInRangeLine> */}
                        <HealthRemainingLine></HealthRemainingLine>
                        <ResourcesLostLine></ResourcesLostLine>
                        <ResourcesPerHitLine></ResourcesPerHitLine>
                        <ResourcesPerSecondLine></ResourcesPerSecondLine>
                        {/* <TimeNeededToReachFromStartingFromMaxRange></TimeNeededToReachFromStartingFromMaxRange> */}
                        {/* <AttackVsArmorLine></AttackVsArmorLine> */}
                        <MonkHealingLine></MonkHealingLine>
                        <ConversionLine></ConversionLine>
                        {/* <RemainingArmorAfterFight></RemainingArmorAfterFight> */}
                        {/* <GoldGeneratedDuringFight></GoldGeneratedDuringFight> */}
                        
                        <SeparatorLine></SeparatorLine>

                        <TitleLine> Stats </TitleLine>
                        <CostLine></CostLine>
                        <HealthLine></HealthLine>
                        <AttackDamageLine></AttackDamageLine>
                        <SecondaryAttackDamageLine></SecondaryAttackDamageLine>
                        <ArmorLine></ArmorLine>
                        <MovementSpeedLine></MovementSpeedLine>
                        <AttackRateLine></AttackRateLine>
                        <RangeLine></RangeLine>
                        <AccuracyLine></AccuracyLine>
                        <CapacitiesLine></CapacitiesLine>
                        <LineOfSightLine></LineOfSightLine>
                        <ContinuousProductionLine></ContinuousProductionLine>
                        <TrainingTimeLine></TrainingTimeLine>
                    </StatsContainer>
                </div>
                <div className="Upgrades Upgrades2">
                    {
                        unit2UpgradeLines.map((line, i) => {
                            return (<div key={i} className="UpgradeLine">
                                {line.map(upgrade => (<UnitCalculatorUpgradeComponent key={upgrade.id} upgrade={upgrade} size={BoxSize.mini}
                                    isSelected={!!selectedUnit2Upgrades.find(u => u.id === upgrade.id)} onClick={onUpgrade2Click}></UnitCalculatorUpgradeComponent>))}
                            </div>)
                        })
                    }
                    {
                        unit2AffectingUniqueTechs.map((line, i) => {
                            return (<div key={i} className="UpgradeLine">
                                {line.map(upgrade => (<UnitCalculatorUpgradeComponent key={upgrade.id} upgrade={upgrade} size={BoxSize.mini}
                                    isSelected={!!selectedUnit2Upgrades.find(u => u.id === upgrade.id)} onClick={onUpgrade2Click}></UnitCalculatorUpgradeComponent>))}
                            </div>)
                        })
                    }
                    <div className="BonusList">
                        {
                            unit2AffectingBonuses.map(bonus => {
                                const isSelected = selectedUnit2Bonuses.some(b => b.id === bonus.id)
                                return (<div onClick={() => onBonusClick2(bonus)} className={isSelected ? 'Selected' : ''}>
                                    <BonusLine key={bonus.id} bonus={bonus} displayCivCrest={true} displayTeamBonus={true} hideTooltip={true}></BonusLine>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className="SelectedUnitLine">
                    {
                        getChainedUnits(unit2).map(unit => (
                            <UnitCalculatorUnitComponent key={unit.id} unit={unit} onClick={onUnit2Click} size={BoxSize.mini}></UnitCalculatorUnitComponent>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UnitCalculator