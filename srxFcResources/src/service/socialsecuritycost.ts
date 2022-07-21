import {getConnection,getManager} from "typeorm";
const CONNECTION = getConnection();
import stat from "../util/state";
import {queryCondition} from "../dao/queryDao";
import { socialsecurityexpense } from "../entity/socialsecurityexpense";
import {del} from "../dao/deleteDao";
import log4js from "../util/logs";
import { socialsecurityfee } from "../entity/socialsecurityfee";
const Logger = log4js.getLogger('error');
//社保费用中 添加个人社保费用信息
export async function socialsecuritycost(retrieve,werretrieve,werdata){
    try {
        let re  = JSON.parse(retrieve);
        let da  = JSON.parse(werdata);
        let percentage = 0.01;
        //养老保险单位代缴比例
        let socialsecurityexpenseEIUPProportion = (re.socialsecurityexpenseEIUPProportion * percentage)
        //养老保险个人代缴比例
        let socialsecurityexpensePEIPIndividual = (re.socialsecurityexpensePEIPIndividual * percentage)
        //养老保险合计比例
        let socialsecurityexpenseTPEInsurance = (socialsecurityexpenseEIUPProportion + socialsecurityexpensePEIPIndividual)

        //医疗保险单位代缴比例
        let socialsecurityexpenseMIUPProportion = (re.socialsecurityexpenseMIUPProportion * percentage)
        //医疗保险个人代缴比例
        let socialsecurityexpenseMIICRatio = (re.socialsecurityexpenseMIICRatio * percentage)
        //医疗保险合计比例
        let socialsecurityexpenseTPMInsurance = (socialsecurityexpenseMIUPProportion + socialsecurityexpenseMIICRatio)

        //大病统筹费单位代缴比例
        let socialsecurityexpensePSIPUnit = (re.socialsecurityexpensePSIPUnit * percentage)
        //大病统筹费个人代缴比例
        let socialsecurityexpenseSIIPProportion = (re.socialsecurityexpenseSIIPProportion * percentage)
        //大病统筹费合计比例
        let socialsecurityexpensePOPSDiseases = (socialsecurityexpensePSIPUnit + socialsecurityexpenseSIIPProportion)

        //生育保险单位代缴比例
        let socialsecurityexpensePMIUnits = (re.socialsecurityexpensePMIUnits * percentage)
        //生育保险个人代缴比例
        let socialsecurityexpensePIPMInsurance = (re.socialsecurityexpensePIPMInsurance * percentage)
        //生育保险合计比例
        let socialsecurityexpensePOMInsurance = (socialsecurityexpensePMIUnits + socialsecurityexpensePIPMInsurance)

        //工伤保险单位代缴比例
        let socialsecurityexpensePICIUnits = (re.socialsecurityexpensePICIUnits * percentage)
        //工伤保险报表比例
        let socialsecurityexpensePICIStatements = (re.socialsecurityexpensePICIStatements * percentage)
        //工伤保险个人代缴比例
        let socialsecurityexpenseICIICRatio = (re.socialsecurityexpenseICIICRatio * percentage)
        //工伤保险合计比例
        let socialsecurityexpenseTPIIInsurance = (socialsecurityexpensePICIUnits + socialsecurityexpenseICIICRatio)

        //失业保险单位代缴比例
        let socialsecurityexpenseUIUPProportion = (re.socialsecurityexpenseUIUPProportion * percentage)
        //失业保险个人代缴比例
        let socialsecurityexpenseUIICRatio = (re.socialsecurityexpenseUIICRatio * percentage)
        //失业保险合计比例
        let socialsecurityexpenseTPUInsurance = (socialsecurityexpenseUIUPProportion + socialsecurityexpenseUIICRatio)

        //住房公积金单位代缴比例
        let socialsecurityexpensePPHUnits = (re.socialsecurityexpensePPHUnits * percentage)
        //住房公积金个人代缴比例
        let socialsecurityexpensePHRPIndividuals = (re.socialsecurityexpensePHRPIndividuals * percentage)
        //住房公积金合计比例
        let socialsecurityexpenseTPHReserves = (socialsecurityexpensePPHUnits + socialsecurityexpensePHRPIndividuals)


        //养老保险单位代缴金额
        let socialsecurityexpenseAICEInsurance1 = ( (re.socialsecurityexpenseEICbase * socialsecurityexpenseEIUPProportion))
        socialsecurityexpenseAICEInsurance1=Number(socialsecurityexpenseAICEInsurance1.toFixed(2))
        //养老保险后调单位金额
        let socialsecurityexpenseAUAAEInsurance = (re.socialsecurityexpenseEIALater * socialsecurityexpenseEIUPProportion)
        socialsecurityexpenseAUAAEInsurance=Number(socialsecurityexpenseAUAAEInsurance.toFixed(2))
        //养老保险个人缴费金额
        let socialsecurityexpenseAOICEOInsurance = (re.socialsecurityexpenseEICbase * socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAOICEOInsurance=Number(socialsecurityexpenseAOICEOInsurance.toFixed(2))
        //养老保险后调个人缴费金
        let socialsecurityexpenseAAIPAEInsurance = (re.socialsecurityexpenseEIALater * socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAAIPAEInsurance=Number(socialsecurityexpenseAAIPAEInsurance.toFixed(2))
        //养老保险合计缴费金额
        let socialsecurityexpenseTCAEInsurance = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAOICEOInsurance)
        //养老保险后调合计金额
        let socialsecurityexpenseTAPIAAdjustment = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAAIPAEInsurance)


        //医疗保险单位代缴金额
        let socialsecurityexpenseAPMIUnit = (re.socialsecurityexpenseMICBase * socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAPMIUnit=Number(socialsecurityexpenseAPMIUnit.toFixed(2))
        //医疗保险后调单位金额
        let socialsecurityexpenseAUAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAUAAMInsurance=Number(socialsecurityexpenseAUAAMInsurance.toFixed(2))
        //医疗保险个人缴费金额
        let socialsecurityexpenseAICMInsurance = (re.socialsecurityexpenseMICBase * socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAICMInsurance=Number(socialsecurityexpenseAICMInsurance.toFixed(2))
        //医疗保险后调个人金额
        let socialsecurityexpenseAPAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAPAAMInsurance=Number(socialsecurityexpenseAPAAMInsurance.toFixed(2))
        //医疗保险合计缴费金额
        let socialsecurityexpenseTCMInsurance = (socialsecurityexpenseAPMIUnit + socialsecurityexpenseAICMInsurance)
        //医疗保险后调合计金额
        let socialsecurityexpenseMIATotal = (socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseAPAAMInsurance)


        //大病统筹单位代缴金额
        let socialsecurityexpenseAPMDCUnit = (re.socialsecurityexpenseTOPBSBiseases * socialsecurityexpensePSIPUnit)
        socialsecurityexpenseAPMDCUnit=Number(socialsecurityexpenseAPMDCUnit.toFixed(2))
        //大病统筹后调单位金额
        let socialsecurityexpenseASIOAUAmount = (re.socialsecurityexpenseASIOABase * socialsecurityexpensePSIPUnit)
        socialsecurityexpenseASIOAUAmount=Number(socialsecurityexpenseASIOAUAmount.toFixed(2))
        //大病统筹个人缴费金额
        let socialsecurityexpenseMIPIPAmount = (re.socialsecurityexpenseTOPBSBiseases * socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseMIPIPAmount=Number(socialsecurityexpenseMIPIPAmount.toFixed(2))
        //大病统筹后调个人金额
        let socialsecurityexpenseAPAASIWhole = (re.socialsecurityexpenseASIOABase * socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseAPAASIWhole=Number(socialsecurityexpenseAPAASIWhole.toFixed(2))
        //大病统筹合计缴费金额
        let socialsecurityexpenseTAPSDiseases = (socialsecurityexpenseAPMDCUnit + socialsecurityexpenseMIPIPAmount)
        //大病统筹后调合计金额
        let socialsecurityexpenseATASIAOPlanning = (socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAPAASIWhole)


        //生育保险单位代缴金额
        let socialsecurityexpenseAPBMIUnit = (re.socialsecurityexpenseCBMInsurance * socialsecurityexpensePMIUnits)
        socialsecurityexpenseAPBMIUnit=Number(socialsecurityexpenseAPBMIUnit.toFixed(2))
        //生育保险后调单位金额
        let socialsecurityexpenseAUAABInsurance = (re.socialsecurityexpenseBIABAfter * socialsecurityexpensePMIUnits)
        socialsecurityexpenseAUAABInsurance=Number(socialsecurityexpenseAUAABInsurance.toFixed(2))
        //生育保险个人缴费金额
        let socialsecurityexpenseICMInsurance = (re.socialsecurityexpenseCBMInsurance * socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseICMInsurance=Number(socialsecurityexpenseICMInsurance.toFixed(2))
        //生育保险后调个人金额
        let socialsecurityexpenseAIAABInsurance = (re.socialsecurityexpenseBIABAfter * socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseAIAABInsurance=Number(socialsecurityexpenseAIAABInsurance.toFixed(2))
        //生育保险合计缴费金额
        let socialsecurityexpenseTPOMInsurance = (socialsecurityexpenseAPBMIUnit + socialsecurityexpenseICMInsurance)
        //生育保险后调合计金额
        let socialsecurityexpenseTAAMInsurance = (socialsecurityexpenseAUAABInsurance + socialsecurityexpenseAIAABInsurance)


        //工伤保险单位代缴金额
        let socialsecurityexpenseAPIIIIUnit = (re.socialsecurityexpenseBICIContributions * socialsecurityexpensePICIUnits)
        socialsecurityexpenseAPIIIIUnit=Number(socialsecurityexpenseAPIIIIUnit.toFixed(2))
        //工伤保险后调单位金额
        let socialsecurityexpenseIIIAUAmount = (re.socialsecurityexpenseICIBAdjustment * socialsecurityexpensePICIUnits)
        socialsecurityexpenseIIIAUAmount=Number(socialsecurityexpenseIIIAUAmount.toFixed(2))
        //工伤保险个人缴费金额
        let socialsecurityexpenseIIIICAmount = (re.socialsecurityexpenseBICIContributions * socialsecurityexpenseICIICRatio)
        socialsecurityexpenseIIIICAmount=Number(socialsecurityexpenseIIIICAmount.toFixed(2))
        //工伤保险后调个人金额
        let socialsecurityexpenseAPAAWIInsurance = (re.socialsecurityexpenseICIBAdjustment * socialsecurityexpenseICIICRatio)
        socialsecurityexpenseAPAAWIInsurance=Number(socialsecurityexpenseAPAAWIInsurance.toFixed(2))
        //工伤保险合计缴纳金额
        let socialsecurityexpenseTPAIIInsurance = (socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseIIIICAmount)
        //工伤保险后调金额
        let socialsecurityexpenseAAWIInsurance = (socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAPAAWIInsurance)


        //失业保险单位代缴金额
        let socialsecurityexpenseAPUIUnit = (re.socialsecurityexpenseUICBase * socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAPUIUnit=Number(socialsecurityexpenseAPUIUnit.toFixed(2))
        //失业保险后调单位金额
        let socialsecurityexpenseAUAAUInsurance = (re.socialsecurityexpenseUIBWRBack * socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAUAAUInsurance=Number(socialsecurityexpenseAUAAUInsurance.toFixed(2))
        //失业保险个人缴费金额
        let socialsecurityexpenseUIICAmount = (re.socialsecurityexpenseUICBase * socialsecurityexpenseUIICRatio)
        socialsecurityexpenseUIICAmount=Number(socialsecurityexpenseUIICAmount.toFixed(2))
        //失业保险后调个人金额
        let socialsecurityexpenseAPAAUInsurance = (re.socialsecurityexpenseUIBWRBack * socialsecurityexpenseUIICRatio)
        socialsecurityexpenseAPAAUInsurance=Number(socialsecurityexpenseAPAAUInsurance.toFixed(2))
        //失业保险合计缴费金额
        let socialsecurityexpenseTCUInsurance = (socialsecurityexpenseAPUIUnit + socialsecurityexpenseUIICAmount)
        //失业保险后调合计缴费金
        let socialsecurityexpenseATAUIPayment = (socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseAPAAUInsurance)


        //住房公积金单位带缴金额
        let socialsecurityexpenseHAFPAmount = (re.socialsecurityexpenseHAFPBase * socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFPAmount=Number(socialsecurityexpenseHAFPAmount.toFixed(0))
        //住房公积金后调单位金额
        let socialsecurityexpenseHAFAAUAmount = (re.socialsecurityexpenseHRBAdjustment * socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFAAUAmount=Number(socialsecurityexpenseHAFAAUAmount.toFixed(0))
        //住房公积个人缴费金额
        let socialsecurityexpenseAPIHReserves = (re.socialsecurityexpenseHAFPBase * socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseAPIHReserves=Number(socialsecurityexpenseAPIHReserves.toFixed(0))
        //住房公积个后调人金额
        let socialsecurityexpenseHRATAmount = (re.socialsecurityexpenseHRBAdjustment * socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseHRATAmount=Number(socialsecurityexpenseHRATAmount.toFixed(0))
        //住房公积合计合计缴费金额
        let socialsecurityexpenseHRTTAPayment = (socialsecurityexpenseHAFPAmount + socialsecurityexpenseAPIHReserves)
        //住房公积合计后调合计金额
        let socialsecurityexpenseTAHRAATotal = (socialsecurityexpenseHAFAAUAmount + socialsecurityexpenseHRATAmount)



        //单位代缴金额合计
        let socialsecurityexpenseTAPUit = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAPMIUnit + socialsecurityexpenseAPMDCUnit + socialsecurityexpenseAPBMIUnit + socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseAPUIUnit + socialsecurityexpenseHAFPAmount+re.socialsecurityexpenseManagementFPBase)

        //后调单位金额合计
        let socialsecurityexpenseTUALater = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAUAABInsurance + socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseHAFAAUAmount)

        //个人缴费金额合计
        let socialsecurityexpenseTAPIndividuals = (socialsecurityexpenseAOICEOInsurance + socialsecurityexpenseAICMInsurance + socialsecurityexpenseMIPIPAmount + socialsecurityexpenseICMInsurance + socialsecurityexpenseIIIICAmount + socialsecurityexpenseUIICAmount + socialsecurityexpenseAPIHReserves)
        //后调个人金额合计
        let socialsecurityexpenseTPAALater = (socialsecurityexpenseAAIPAEInsurance + socialsecurityexpenseAPAAMInsurance + socialsecurityexpenseAPAASIWhole + socialsecurityexpenseAIAABInsurance + socialsecurityexpenseAPAAWIInsurance + socialsecurityexpenseAPAAUInsurance + socialsecurityexpenseHRATAmount)

        //合计缴费金额合计
        let socialsecurityexpenseTAPTAPayment = (socialsecurityexpenseTCAEInsurance + socialsecurityexpenseTCMInsurance + socialsecurityexpenseTAPSDiseases + socialsecurityexpenseTPOMInsurance + socialsecurityexpenseTPAIIInsurance + socialsecurityexpenseTCUInsurance + socialsecurityexpenseHRTTAPayment+re.socialsecurityexpenseManagementFPBase)

        //后调缴费金额合计
        let socialsecurityexpenseTAPAAdjustment = (socialsecurityexpenseTAPIAAdjustment + socialsecurityexpenseMIATotal + socialsecurityexpenseATASIAOPlanning + socialsecurityexpenseTAAMInsurance + socialsecurityexpenseAAWIInsurance + socialsecurityexpenseATAUIPayment + socialsecurityexpenseTAHRAATotal)

        //补差

        //补差个人部分养老
        let makeupPersonalOldage =((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * socialsecurityexpensePEIPIndividual);
        makeupPersonalOldage=Number(makeupPersonalOldage.toFixed(2))
        //补差个人部分医疗
        let makeupPersonalMedical =((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) *socialsecurityexpenseMIICRatio);
        makeupPersonalMedical=Number(makeupPersonalMedical.toFixed(2))
        //补差个人部分大病
        let makeupPersonalSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *socialsecurityexpenseSIIPProportion);
        makeupPersonalSeriousIllness=Number(makeupPersonalSeriousIllness.toFixed(2))
        //补差个人部分失业
        let makeupPersonalUnemployment = ((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) * socialsecurityexpenseUIICRatio);
        makeupPersonalUnemployment=Number(makeupPersonalUnemployment.toFixed(2))
        //补差个人部分公积金
        let makeupPersonalProvidentfund =((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) * socialsecurityexpensePHRPIndividuals);
        makeupPersonalProvidentfund=Number(makeupPersonalProvidentfund.toFixed(2))
        //补差个人部分小计
        let makeupPersonalSubtotal=(makeupPersonalOldage+makeupPersonalMedical+makeupPersonalSeriousIllness+makeupPersonalUnemployment+makeupPersonalProvidentfund);


        //补差单位部分养老
        let makeupUnitOldage=((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * socialsecurityexpenseEIUPProportion)
        makeupUnitOldage=Number(makeupUnitOldage.toFixed(2))
        //补差单位部分医疗
        let makeupUnitMedical=((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) * socialsecurityexpenseMIUPProportion)
        makeupUnitMedical=Number(makeupUnitMedical.toFixed(2))
        //补差单位部分大病
        let makeupUnitSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *socialsecurityexpensePSIPUnit)
        makeupUnitSeriousIllness=Number(makeupUnitSeriousIllness.toFixed(2))
        //补差单位部分生育
        let makeupUnitGivebBirth=((re.socialsecurityexpenseBIABAfter -re.socialsecurityexpenseCBMInsurance) *socialsecurityexpensePMIUnits)
        makeupUnitGivebBirth=Number(makeupUnitGivebBirth.toFixed(2))
        //补差单位部分失业
        let makeupUnitUnemployment=((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) *socialsecurityexpenseUIUPProportion)
        makeupUnitUnemployment=Number(makeupUnitUnemployment.toFixed(2))
        //补差单位部分工伤
        let makeupUnitWorkInjury=((re.socialsecurityexpenseICIBAdjustment -re.socialsecurityexpenseBICIContributions)*socialsecurityexpensePICIUnits)
        makeupUnitWorkInjury=Number(makeupUnitWorkInjury.toFixed(2))
        //补差单位部分公积金
        let makeupUnitProvidentfund=((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) *socialsecurityexpensePPHUnits)
        makeupUnitProvidentfund=Number(makeupUnitProvidentfund.toFixed(2))
        //补差单位部分小计
        let makeupUnitSubtotal=(makeupUnitOldage+makeupUnitMedical+makeupUnitSeriousIllness+makeupUnitGivebBirth+makeupUnitUnemployment+makeupUnitWorkInjury+makeupUnitProvidentfund)
        //补差合计
        let differencestatement=(makeupPersonalSubtotal+makeupUnitSubtotal)

        // 根据身份证号查重  判断此人有无社保信息
        let srxfcselsocialsecurityexpense = await queryCondition(socialsecurityexpense, werretrieve);


        //截取时间
        let baiduName = da.socialsecurityexpenseDate.substring(0,7)

        //日期查重
        let srxfcselniemp = await CONNECTION
            .getRepository(socialsecurityexpense)
            .createQueryBuilder()
            .where({socialsecurityexpenseDate:baiduName})
            .andWhere({employeeregistrationformIDNumber: re.employeeregistrationformIDNumber})
            .getOne();
        if (srxfcselsocialsecurityexpense) {
            if(srxfcselniemp){
                //日期重复返回11
                return {state: stat.dat}
            }else{
                const adds = await CONNECTION
                    .createQueryBuilder()
                    .insert()
                    .into(socialsecurityexpense)
                    .values([{
                        socialsecurityexpenseDate: baiduName,
                        socialsecurityexpenseACWageBase: re.socialsecurityexpenseACWageBase,
                        socialsecurityexpenseBaseAdjustment: re.socialsecurityexpenseBaseAdjustment,
                        socialsecurityexpenseEICbase: re.socialsecurityexpenseEICbase,
                        socialsecurityexpenseEIALater: re.socialsecurityexpenseEIALater,
                        socialsecurityexpenseEILabel: re.socialsecurityexpenseEILabel,
                        socialsecurityexpenseEIUPProportion: socialsecurityexpenseEIUPProportion,
                        socialsecurityexpenseAICEInsurance: socialsecurityexpenseAICEInsurance1,
                        socialsecurityexpenseAUAAEInsurance: socialsecurityexpenseAUAAEInsurance,
                        socialsecurityexpensePEIPIndividual: socialsecurityexpensePEIPIndividual,
                        socialsecurityexpenseAOICEOInsurance: socialsecurityexpenseAOICEOInsurance,
                        socialsecurityexpenseAAIPAEInsurance: socialsecurityexpenseAAIPAEInsurance,
                        socialsecurityexpenseTPEInsurance: socialsecurityexpenseTPEInsurance,
                        socialsecurityexpenseTCAEInsurance: socialsecurityexpenseTCAEInsurance,
                        socialsecurityexpenseTAPIAAdjustment: socialsecurityexpenseTAPIAAdjustment,
                        socialsecurityexpenseMICBase: re.socialsecurityexpenseMICBase,
                        socialsecurityexpenseMIBAdjustment: re.socialsecurityexpenseMIBAdjustment,
                        socialsecurityexpenseMIUPProportion: socialsecurityexpenseMIUPProportion,
                        socialsecurityexpenseAPMIUnit: socialsecurityexpenseAPMIUnit,
                        socialsecurityexpenseAUAAMInsurance: socialsecurityexpenseAUAAMInsurance,
                        socialsecurityexpenseMIICRatio: socialsecurityexpenseMIICRatio,
                        socialsecurityexpenseAICMInsurance: socialsecurityexpenseAICMInsurance,
                        socialsecurityexpenseAPAAMInsurance: socialsecurityexpenseAPAAMInsurance,
                        socialsecurityexpenseTPMInsurance: socialsecurityexpenseTPMInsurance,
                        socialsecurityexpenseTCMInsurance: socialsecurityexpenseTCMInsurance,
                        socialsecurityexpenseMIATotal: socialsecurityexpenseMIATotal,
                        socialsecurityexpenseTOPBSBiseases: re.socialsecurityexpenseTOPBSBiseases,
                        socialsecurityexpenseASIOABase: re.socialsecurityexpenseASIOABase,
                        socialsecurityexpensePSIPUnit: socialsecurityexpensePSIPUnit,
                        socialsecurityexpenseAPMDCUnit: socialsecurityexpenseAPMDCUnit,
                        socialsecurityexpenseASIOAUAmount: socialsecurityexpenseASIOAUAmount,
                        socialsecurityexpenseSIIPProportion: socialsecurityexpenseSIIPProportion,
                        socialsecurityexpenseMIPIPAmount: socialsecurityexpenseMIPIPAmount,
                        socialsecurityexpenseAPAASIWhole: socialsecurityexpenseAPAASIWhole,
                        socialsecurityexpensePOPSDiseases: socialsecurityexpensePOPSDiseases,
                        socialsecurityexpenseTAPSDiseases: socialsecurityexpenseTAPSDiseases,
                        socialsecurityexpenseATASIAOPlanning: socialsecurityexpenseATASIAOPlanning,
                        socialsecurityexpenseCBMInsurance: re.socialsecurityexpenseCBMInsurance,
                        socialsecurityexpenseBIABAfter: re.socialsecurityexpenseBIABAfter,
                        socialsecurityexpensePMIUnits: socialsecurityexpensePMIUnits,
                        socialsecurityexpenseAPBMIUnit: socialsecurityexpenseAPBMIUnit,
                        socialsecurityexpenseAUAABInsurance: socialsecurityexpenseAUAABInsurance,
                        socialsecurityexpensePIPMInsurance: socialsecurityexpensePIPMInsurance,
                        socialsecurityexpenseICMInsurance: socialsecurityexpenseICMInsurance,
                        socialsecurityexpenseAIAABInsurance: socialsecurityexpenseAIAABInsurance,
                        socialsecurityexpensePOMInsurance: socialsecurityexpensePOMInsurance,
                        socialsecurityexpenseTPOMInsurance: socialsecurityexpenseTPOMInsurance,
                        socialsecurityexpenseTAAMInsurance: socialsecurityexpenseTAAMInsurance,
                        socialsecurityexpenseBICIContributions: re.socialsecurityexpenseBICIContributions,
                        socialsecurityexpenseICIBAdjustment: re.socialsecurityexpenseICIBAdjustment,
                        socialsecurityexpensePICIUnits: socialsecurityexpensePICIUnits,
                        socialsecurityexpenseAPIIIIUnit: socialsecurityexpenseAPIIIIUnit,
                        socialsecurityexpenseIIIAUAmount: socialsecurityexpenseIIIAUAmount,
                        socialsecurityexpensePICIStatements: socialsecurityexpensePICIStatements,
                        socialsecurityexpenseICIICRatio: socialsecurityexpenseICIICRatio,
                        socialsecurityexpenseIIIICAmount: socialsecurityexpenseIIIICAmount,
                        socialsecurityexpenseAPAAWIInsurance: socialsecurityexpenseAPAAWIInsurance,
                        socialsecurityexpenseTPIIInsurance: socialsecurityexpenseTPIIInsurance,
                        socialsecurityexpenseTPAIIInsurance: socialsecurityexpenseTPAIIInsurance,
                        socialsecurityexpenseAAWIInsurance: socialsecurityexpenseAAWIInsurance,
                        socialsecurityexpenseUICBase: re.socialsecurityexpenseUICBase,
                        socialsecurityexpenseUIBWRBack: re.socialsecurityexpenseUIBWRBack,
                        socialsecurityexpenseUIUPProportion: socialsecurityexpenseUIUPProportion,
                        socialsecurityexpenseAPUIUnit: socialsecurityexpenseAPUIUnit,
                        socialsecurityexpenseAUAAUInsurance: socialsecurityexpenseAUAAUInsurance,
                        socialsecurityexpenseUIICRatio: socialsecurityexpenseUIICRatio,
                        socialsecurityexpenseUIICAmount: socialsecurityexpenseUIICAmount,
                        socialsecurityexpenseAPAAUInsurance: socialsecurityexpenseAPAAUInsurance,
                        socialsecurityexpenseTPUInsurance: socialsecurityexpenseTPUInsurance,
                        socialsecurityexpenseTCUInsurance: socialsecurityexpenseTCUInsurance,
                        socialsecurityexpenseATAUIPayment: socialsecurityexpenseATAUIPayment,
                        socialsecurityexpenseHAFPBase: re.socialsecurityexpenseHAFPBase,
                        socialsecurityexpenseHRBAdjustment: re.socialsecurityexpenseHRBAdjustment,
                        socialsecurityexpensePPHUnits: socialsecurityexpensePPHUnits,
                        socialsecurityexpenseHAFPAmount: socialsecurityexpenseHAFPAmount,
                        socialsecurityexpenseHAFAAUAmount: socialsecurityexpenseHAFAAUAmount,
                        socialsecurityexpensePHRPIndividuals: socialsecurityexpensePHRPIndividuals,
                        socialsecurityexpenseAPIHReserves: socialsecurityexpenseAPIHReserves,
                        socialsecurityexpenseHRATAmount: socialsecurityexpenseHRATAmount,
                        socialsecurityexpenseTPHReserves: socialsecurityexpenseTPHReserves,
                        socialsecurityexpenseHRTTAPayment: socialsecurityexpenseHRTTAPayment,
                        socialsecurityexpenseTAHRAATotal: socialsecurityexpenseTAHRAATotal,
                        socialsecurityexpenseManagementFPBase: re.socialsecurityexpenseManagementFPBase,
                        socialsecurityexpenseAMFPUnit: re.socialsecurityexpenseManagementFPBase,
                        socialsecurityexpenseTAMFPaid: re.socialsecurityexpenseManagementFPBase,
                        socialsecurityexpenseASSWage: re.socialsecurityexpenseASSWage,
                        socialsecurityexpensePFSalary: re.socialsecurityexpensePFSalary,
                        socialsecurityexpenseTAPUit: socialsecurityexpenseTAPUit,
                        socialsecurityexpenseTUALater: socialsecurityexpenseTUALater,
                        socialsecurityexpenseTAPIndividuals: socialsecurityexpenseTAPIndividuals,
                        socialsecurityexpenseTPAALater: socialsecurityexpenseTPAALater,
                        socialsecurityexpenseTAPTAPayment: socialsecurityexpenseTAPTAPayment,
                        socialsecurityexpenseTAPAAdjustment: socialsecurityexpenseTAPAAdjustment,
                        employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                        corporateInformationTradeName:re.corporateInformationTradeName,
                        employeeregistrationformFileNumber:re.employeeregistrationformFileNumber,
                        employeeregistrationformName:re.employeeregistrationformName
                    }])
                    .execute();

                const addsfee = await CONNECTION
                    .createQueryBuilder()
                    .insert()
                    .into(socialsecurityfee)
                    .values([{
                        employeeregistrationformFileNumber:re.employeeregistrationformFileNumber,
                        employeeregistrationformName:re.employeeregistrationformName,
                        makeupPersonalOldage:makeupPersonalOldage,
                        makeupPersonalMedical:makeupPersonalMedical,
                        makeupPersonalSeriousIllness:makeupPersonalSeriousIllness,
                        makeupPersonalUnemployment:makeupPersonalUnemployment,
                        makeupPersonalProvidentfund:makeupPersonalProvidentfund,
                        makeupPersonalSubtotal:makeupPersonalSubtotal,
                        makeupUnitOldage:makeupUnitOldage,
                        makeupUnitMedical:makeupUnitMedical,
                        makeupUnitSeriousIllness:makeupUnitSeriousIllness,
                        makeupUnitGivebBirth:makeupUnitGivebBirth,
                        makeupUnitUnemployment:makeupUnitUnemployment,
                        makeupUnitWorkInjury:makeupUnitWorkInjury,
                        makeupUnitProvidentfund:makeupUnitProvidentfund,
                        makeupUnitSubtotal:makeupUnitSubtotal,
                        differencestatement:differencestatement,
                        corporateInformationTradeName:re.corporateInformationTradeName,
                        employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                        socialsecurityexpenseDate:baiduName
                    }])
                    .execute();
                if (adds&&addsfee) {
                    return {state: stat.succeed,data:baiduName}
                } else {
                    return {state: stat.defeated}
                }
            }

        } else {
            const adds = await CONNECTION
                .createQueryBuilder()
                .insert()
                .into(socialsecurityexpense)
                .values([{
                    socialsecurityexpenseDate: baiduName,
                    socialsecurityexpenseACWageBase: re.socialsecurityexpenseACWageBase,
                    socialsecurityexpenseBaseAdjustment: re.socialsecurityexpenseBaseAdjustment,
                    socialsecurityexpenseEICbase: re.socialsecurityexpenseEICbase,
                    socialsecurityexpenseEIALater: re.socialsecurityexpenseEIALater,
                    socialsecurityexpenseEILabel: re.socialsecurityexpenseEILabel,
                    socialsecurityexpenseEIUPProportion: socialsecurityexpenseEIUPProportion,
                    socialsecurityexpenseAICEInsurance: socialsecurityexpenseAICEInsurance1,
                    socialsecurityexpenseAUAAEInsurance: socialsecurityexpenseAUAAEInsurance,
                    socialsecurityexpensePEIPIndividual: socialsecurityexpensePEIPIndividual,
                    socialsecurityexpenseAOICEOInsurance: socialsecurityexpenseAOICEOInsurance,
                    socialsecurityexpenseAAIPAEInsurance: socialsecurityexpenseAAIPAEInsurance,
                    socialsecurityexpenseTPEInsurance: socialsecurityexpenseTPEInsurance,
                    socialsecurityexpenseTCAEInsurance: socialsecurityexpenseTCAEInsurance,
                    socialsecurityexpenseTAPIAAdjustment: socialsecurityexpenseTAPIAAdjustment,
                    socialsecurityexpenseMICBase: re.socialsecurityexpenseMICBase,
                    socialsecurityexpenseMIBAdjustment: re.socialsecurityexpenseMIBAdjustment,
                    socialsecurityexpenseMIUPProportion: socialsecurityexpenseMIUPProportion,
                    socialsecurityexpenseAPMIUnit: socialsecurityexpenseAPMIUnit,
                    socialsecurityexpenseAUAAMInsurance: socialsecurityexpenseAUAAMInsurance,
                    socialsecurityexpenseMIICRatio: socialsecurityexpenseMIICRatio,
                    socialsecurityexpenseAICMInsurance: socialsecurityexpenseAICMInsurance,
                    socialsecurityexpenseAPAAMInsurance: socialsecurityexpenseAPAAMInsurance,
                    socialsecurityexpenseTPMInsurance: socialsecurityexpenseTPMInsurance,
                    socialsecurityexpenseTCMInsurance: socialsecurityexpenseTCMInsurance,
                    socialsecurityexpenseMIATotal: socialsecurityexpenseMIATotal,
                    socialsecurityexpenseTOPBSBiseases: re.socialsecurityexpenseTOPBSBiseases,
                    socialsecurityexpenseASIOABase: re.socialsecurityexpenseASIOABase,
                    socialsecurityexpensePSIPUnit: socialsecurityexpensePSIPUnit,
                    socialsecurityexpenseAPMDCUnit: socialsecurityexpenseAPMDCUnit,
                    socialsecurityexpenseASIOAUAmount: socialsecurityexpenseASIOAUAmount,
                    socialsecurityexpenseSIIPProportion: socialsecurityexpenseSIIPProportion,
                    socialsecurityexpenseMIPIPAmount: socialsecurityexpenseMIPIPAmount,
                    socialsecurityexpenseAPAASIWhole: socialsecurityexpenseAPAASIWhole,
                    socialsecurityexpensePOPSDiseases: socialsecurityexpensePOPSDiseases,
                    socialsecurityexpenseTAPSDiseases: socialsecurityexpenseTAPSDiseases,
                    socialsecurityexpenseATASIAOPlanning: socialsecurityexpenseATASIAOPlanning,
                    socialsecurityexpenseCBMInsurance: re.socialsecurityexpenseCBMInsurance,
                    socialsecurityexpenseBIABAfter: re.socialsecurityexpenseBIABAfter,
                    socialsecurityexpensePMIUnits: socialsecurityexpensePMIUnits,
                    socialsecurityexpenseAPBMIUnit: socialsecurityexpenseAPBMIUnit,
                    socialsecurityexpenseAUAABInsurance: socialsecurityexpenseAUAABInsurance,
                    socialsecurityexpensePIPMInsurance: socialsecurityexpensePIPMInsurance,
                    socialsecurityexpenseICMInsurance: socialsecurityexpenseICMInsurance,
                    socialsecurityexpenseAIAABInsurance: socialsecurityexpenseAIAABInsurance,
                    socialsecurityexpensePOMInsurance: socialsecurityexpensePOMInsurance,
                    socialsecurityexpenseTPOMInsurance: socialsecurityexpenseTPOMInsurance,
                    socialsecurityexpenseTAAMInsurance: socialsecurityexpenseTAAMInsurance,
                    socialsecurityexpenseBICIContributions: re.socialsecurityexpenseBICIContributions,
                    socialsecurityexpenseICIBAdjustment: re.socialsecurityexpenseICIBAdjustment,
                    socialsecurityexpensePICIUnits: socialsecurityexpensePICIUnits,
                    socialsecurityexpenseAPIIIIUnit: socialsecurityexpenseAPIIIIUnit,
                    socialsecurityexpenseIIIAUAmount: socialsecurityexpenseIIIAUAmount,
                    socialsecurityexpensePICIStatements: socialsecurityexpensePICIStatements,
                    socialsecurityexpenseICIICRatio: socialsecurityexpenseICIICRatio,
                    socialsecurityexpenseIIIICAmount: socialsecurityexpenseIIIICAmount,
                    socialsecurityexpenseAPAAWIInsurance: socialsecurityexpenseAPAAWIInsurance,
                    socialsecurityexpenseTPIIInsurance: socialsecurityexpenseTPIIInsurance,
                    socialsecurityexpenseTPAIIInsurance: socialsecurityexpenseTPAIIInsurance,
                    socialsecurityexpenseAAWIInsurance: socialsecurityexpenseAAWIInsurance,
                    socialsecurityexpenseUICBase: re.socialsecurityexpenseUICBase,
                    socialsecurityexpenseUIBWRBack: re.socialsecurityexpenseUIBWRBack,
                    socialsecurityexpenseUIUPProportion: socialsecurityexpenseUIUPProportion,
                    socialsecurityexpenseAPUIUnit: socialsecurityexpenseAPUIUnit,
                    socialsecurityexpenseAUAAUInsurance: socialsecurityexpenseAUAAUInsurance,
                    socialsecurityexpenseUIICRatio: socialsecurityexpenseUIICRatio,
                    socialsecurityexpenseUIICAmount: socialsecurityexpenseUIICAmount,
                    socialsecurityexpenseAPAAUInsurance: socialsecurityexpenseAPAAUInsurance,
                    socialsecurityexpenseTPUInsurance: socialsecurityexpenseTPUInsurance,
                    socialsecurityexpenseTCUInsurance: socialsecurityexpenseTCUInsurance,
                    socialsecurityexpenseATAUIPayment: socialsecurityexpenseATAUIPayment,
                    socialsecurityexpenseHAFPBase: re.socialsecurityexpenseHAFPBase,
                    socialsecurityexpenseHRBAdjustment: re.socialsecurityexpenseHRBAdjustment,
                    socialsecurityexpensePPHUnits: socialsecurityexpensePPHUnits,
                    socialsecurityexpenseHAFPAmount: socialsecurityexpenseHAFPAmount,
                    socialsecurityexpenseHAFAAUAmount: socialsecurityexpenseHAFAAUAmount,
                    socialsecurityexpensePHRPIndividuals: socialsecurityexpensePHRPIndividuals,
                    socialsecurityexpenseAPIHReserves: socialsecurityexpenseAPIHReserves,
                    socialsecurityexpenseHRATAmount: socialsecurityexpenseHRATAmount,
                    socialsecurityexpenseTPHReserves: socialsecurityexpenseTPHReserves,
                    socialsecurityexpenseHRTTAPayment: socialsecurityexpenseHRTTAPayment,
                    socialsecurityexpenseTAHRAATotal: socialsecurityexpenseTAHRAATotal,
                    socialsecurityexpenseManagementFPBase: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseAMFPUnit: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseTAMFPaid: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseASSWage: re.socialsecurityexpenseASSWage,
                    socialsecurityexpensePFSalary: re.socialsecurityexpensePFSalary,
                    socialsecurityexpenseTAPUit: socialsecurityexpenseTAPUit,
                    socialsecurityexpenseTUALater: socialsecurityexpenseTUALater,
                    socialsecurityexpenseTAPIndividuals: socialsecurityexpenseTAPIndividuals,
                    socialsecurityexpenseTPAALater: socialsecurityexpenseTPAALater,
                    socialsecurityexpenseTAPTAPayment: socialsecurityexpenseTAPTAPayment,
                    socialsecurityexpenseTAPAAdjustment: socialsecurityexpenseTAPAAdjustment,
                    employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                    corporateInformationTradeName:re.corporateInformationTradeName,
                    employeeregistrationformFileNumber:re.employeeregistrationformFileNumber,
                    employeeregistrationformName:re.employeeregistrationformName
                }])
                .execute();

            const addsfee = await CONNECTION
                .createQueryBuilder()
                .insert()
                .into(socialsecurityfee)
                .values([{
                    employeeregistrationformFileNumber:re.employeeregistrationformFileNumber,
                    employeeregistrationformName:re.employeeregistrationformName,
                    makeupPersonalOldage:makeupPersonalOldage,
                    makeupPersonalMedical:makeupPersonalMedical,
                    makeupPersonalSeriousIllness:makeupPersonalSeriousIllness,
                    makeupPersonalUnemployment:makeupPersonalUnemployment,
                    makeupPersonalProvidentfund:makeupPersonalProvidentfund,
                    makeupPersonalSubtotal:makeupPersonalSubtotal,
                    makeupUnitOldage:makeupUnitOldage,
                    makeupUnitMedical:makeupUnitMedical,
                    makeupUnitSeriousIllness:makeupUnitSeriousIllness,
                    makeupUnitGivebBirth:makeupUnitGivebBirth,
                    makeupUnitUnemployment:makeupUnitUnemployment,
                    makeupUnitWorkInjury:makeupUnitWorkInjury,
                    makeupUnitProvidentfund:makeupUnitProvidentfund,
                    makeupUnitSubtotal:makeupUnitSubtotal,
                    differencestatement:differencestatement,
                    corporateInformationTradeName:re.corporateInformationTradeName,
                    employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                    socialsecurityexpenseDate:baiduName
                }])
                .execute();
            if (adds&&addsfee) {
                return {state: stat.succeed,data:baiduName}
            } else {
                return {state: stat.defeated}
            }
        }
    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  socialsecuritycost ---------",e);
        return {state: stat.defeated};
    }

}
// 社保费用中 删除个人社保费用信息
export async function delsec(retrieve) {
    try {

        //根据身份证号删除社保信息
        const  dlesec=await del(socialsecurityexpense,retrieve);

        if (dlesec.affected==1){
            return {state:stat.succeed}
        }else {
            return {state:stat.defeated}
        }


    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  delsec ---------",e);
        return {state: stat.defeated};
    }
}



// 查询单挑数据
export async function selidsoci(entity,werretrieve){
    try {
        let srxfcselniemp = await queryCondition(entity, werretrieve);
        if (srxfcselniemp) {
            // 查询成功 返回1
            return {state: stat.succeed,data: srxfcselniemp}
        } else {
            // 查询失败 返回0
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  selidsoci ---------", e);
        return {state: stat.defeated};
    }
}


//修改社保费用
export async function updsoci(retrieve,werdata){

    try {
        let re = JSON.parse(retrieve);
        let da = JSON.parse(werdata);

        let percentage = 0.01;

        //养老保险单位代缴比例
        let socialsecurityexpenseEIUPProportion = (re.socialsecurityexpenseEIUPProportion * percentage)
        //养老保险个人代缴比例
        let socialsecurityexpensePEIPIndividual = (re.socialsecurityexpensePEIPIndividual * percentage)
        //养老保险合计比例
        let socialsecurityexpenseTPEInsurance = (socialsecurityexpenseEIUPProportion + socialsecurityexpensePEIPIndividual)

        //医疗保险单位代缴比例
        let socialsecurityexpenseMIUPProportion = (re.socialsecurityexpenseMIUPProportion * percentage)
        //医疗保险个人代缴比例
        let socialsecurityexpenseMIICRatio = (re.socialsecurityexpenseMIICRatio * percentage)
        //医疗保险合计比例
        let socialsecurityexpenseTPMInsurance = (socialsecurityexpenseMIUPProportion + socialsecurityexpenseMIICRatio)

        //大病统筹费单位代缴比例
        let socialsecurityexpensePSIPUnit = (re.socialsecurityexpensePSIPUnit * percentage)
        //大病统筹费个人代缴比例
        let socialsecurityexpenseSIIPProportion = (re.socialsecurityexpenseSIIPProportion * percentage)
        //大病统筹费合计比例
        let socialsecurityexpensePOPSDiseases = (socialsecurityexpensePSIPUnit + socialsecurityexpenseSIIPProportion)

        //生育保险单位代缴比例
        let socialsecurityexpensePMIUnits = (re.socialsecurityexpensePMIUnits * percentage)
        //生育保险个人代缴比例
        let socialsecurityexpensePIPMInsurance = (re.socialsecurityexpensePIPMInsurance * percentage)
        //生育保险合计比例
        let socialsecurityexpensePOMInsurance = (socialsecurityexpensePMIUnits + socialsecurityexpensePIPMInsurance)

        //工伤保险单位代缴比例
        let socialsecurityexpensePICIUnits = (re.socialsecurityexpensePICIUnits * percentage)
        //工伤保险报表比例
        let socialsecurityexpensePICIStatements = (re.socialsecurityexpensePICIStatements * percentage)
        //工伤保险个人代缴比例
        let socialsecurityexpenseICIICRatio = (re.socialsecurityexpenseICIICRatio * percentage)
        //工伤保险合计比例
        let socialsecurityexpenseTPIIInsurance = (socialsecurityexpensePICIUnits + socialsecurityexpenseICIICRatio)

        //失业保险单位代缴比例
        let socialsecurityexpenseUIUPProportion = (re.socialsecurityexpenseUIUPProportion * percentage)
        //失业保险个人代缴比例
        let socialsecurityexpenseUIICRatio = (re.socialsecurityexpenseUIICRatio * percentage)
        //失业保险合计比例
        let socialsecurityexpenseTPUInsurance = (socialsecurityexpenseUIUPProportion + socialsecurityexpenseUIICRatio)

        //住房公积金单位代缴比例
        let socialsecurityexpensePPHUnits = (re.socialsecurityexpensePPHUnits * percentage)
        //住房公积金个人代缴比例
        let socialsecurityexpensePHRPIndividuals = (re.socialsecurityexpensePHRPIndividuals * percentage)
        //住房公积金合计比例
        let socialsecurityexpenseTPHReserves = (socialsecurityexpensePPHUnits + socialsecurityexpensePHRPIndividuals)


        //养老保险单位代缴金额
        let socialsecurityexpenseAICEInsurance1 = ( (re.socialsecurityexpenseEICbase * socialsecurityexpenseEIUPProportion))
        socialsecurityexpenseAICEInsurance1=Number(socialsecurityexpenseAICEInsurance1.toFixed(2))
        //养老保险后调单位金额
        let socialsecurityexpenseAUAAEInsurance = (re.socialsecurityexpenseEIALater * socialsecurityexpenseEIUPProportion)
        socialsecurityexpenseAUAAEInsurance=Number(socialsecurityexpenseAUAAEInsurance.toFixed(2))
        //养老保险个人缴费金额
        let socialsecurityexpenseAOICEOInsurance = (re.socialsecurityexpenseEICbase * socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAOICEOInsurance=Number(socialsecurityexpenseAOICEOInsurance.toFixed(2))
        //养老保险后调个人缴费金
        let socialsecurityexpenseAAIPAEInsurance = (re.socialsecurityexpenseEIALater * socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAAIPAEInsurance=Number(socialsecurityexpenseAAIPAEInsurance.toFixed(2))
        //养老保险合计缴费金额
        let socialsecurityexpenseTCAEInsurance = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAOICEOInsurance)
        //养老保险后调合计金额
        let socialsecurityexpenseTAPIAAdjustment = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAAIPAEInsurance)


        //医疗保险单位代缴金额
        let socialsecurityexpenseAPMIUnit = (re.socialsecurityexpenseMICBase * socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAPMIUnit=Number(socialsecurityexpenseAPMIUnit.toFixed(2))
        //医疗保险后调单位金额
        let socialsecurityexpenseAUAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAUAAMInsurance=Number(socialsecurityexpenseAUAAMInsurance.toFixed(2))
        //医疗保险个人缴费金额
        let socialsecurityexpenseAICMInsurance = (re.socialsecurityexpenseMICBase * socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAICMInsurance=Number(socialsecurityexpenseAICMInsurance.toFixed(2))
        //医疗保险后调个人金额
        let socialsecurityexpenseAPAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAPAAMInsurance=Number(socialsecurityexpenseAPAAMInsurance.toFixed(2))
        //医疗保险合计缴费金额
        let socialsecurityexpenseTCMInsurance = (socialsecurityexpenseAPMIUnit + socialsecurityexpenseAICMInsurance)
        //医疗保险后调合计金额
        let socialsecurityexpenseMIATotal = (socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseAPAAMInsurance)


        //大病统筹单位代缴金额
        let socialsecurityexpenseAPMDCUnit = (re.socialsecurityexpenseTOPBSBiseases * socialsecurityexpensePSIPUnit)
        socialsecurityexpenseAPMDCUnit=Number(socialsecurityexpenseAPMDCUnit.toFixed(2))
        //大病统筹后调单位金额
        let socialsecurityexpenseASIOAUAmount = (re.socialsecurityexpenseASIOABase * socialsecurityexpensePSIPUnit)
        socialsecurityexpenseASIOAUAmount=Number(socialsecurityexpenseASIOAUAmount.toFixed(2))
        //大病统筹个人缴费金额
        let socialsecurityexpenseMIPIPAmount = (re.socialsecurityexpenseTOPBSBiseases * socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseMIPIPAmount=Number(socialsecurityexpenseMIPIPAmount.toFixed(2))
        //大病统筹后调个人金额
        let socialsecurityexpenseAPAASIWhole = (re.socialsecurityexpenseASIOABase * socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseAPAASIWhole=Number(socialsecurityexpenseAPAASIWhole.toFixed(2))
        //大病统筹合计缴费金额
        let socialsecurityexpenseTAPSDiseases = (socialsecurityexpenseAPMDCUnit + socialsecurityexpenseMIPIPAmount)
        //大病统筹后调合计金额
        let socialsecurityexpenseATASIAOPlanning = (socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAPAASIWhole)


        //生育保险单位代缴金额
        let socialsecurityexpenseAPBMIUnit = (re.socialsecurityexpenseCBMInsurance * socialsecurityexpensePMIUnits)
        socialsecurityexpenseAPBMIUnit=Number(socialsecurityexpenseAPBMIUnit.toFixed(2))
        //生育保险后调单位金额
        let socialsecurityexpenseAUAABInsurance = (re.socialsecurityexpenseBIABAfter * socialsecurityexpensePMIUnits)
        socialsecurityexpenseAUAABInsurance=Number(socialsecurityexpenseAUAABInsurance.toFixed(2))
        //生育保险个人缴费金额
        let socialsecurityexpenseICMInsurance = (re.socialsecurityexpenseCBMInsurance * socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseICMInsurance=Number(socialsecurityexpenseICMInsurance.toFixed(2))
        //生育保险后调个人金额
        let socialsecurityexpenseAIAABInsurance = (re.socialsecurityexpenseBIABAfter * socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseAIAABInsurance=Number(socialsecurityexpenseAIAABInsurance.toFixed(2))
        //生育保险合计缴费金额
        let socialsecurityexpenseTPOMInsurance = (socialsecurityexpenseAPBMIUnit + socialsecurityexpenseICMInsurance)
        //生育保险后调合计金额
        let socialsecurityexpenseTAAMInsurance = (socialsecurityexpenseAUAABInsurance + socialsecurityexpenseAIAABInsurance)


        //工伤保险单位代缴金额
        let socialsecurityexpenseAPIIIIUnit = (re.socialsecurityexpenseBICIContributions * socialsecurityexpensePICIUnits)
        socialsecurityexpenseAPIIIIUnit=Number(socialsecurityexpenseAPIIIIUnit.toFixed(2))
        //工伤保险后调单位金额
        let socialsecurityexpenseIIIAUAmount = (re.socialsecurityexpenseICIBAdjustment * socialsecurityexpensePICIUnits)
        socialsecurityexpenseIIIAUAmount=Number(socialsecurityexpenseIIIAUAmount.toFixed(2))
        //工伤保险个人缴费金额
        let socialsecurityexpenseIIIICAmount = (re.socialsecurityexpenseBICIContributions * socialsecurityexpenseICIICRatio)
        socialsecurityexpenseIIIICAmount=Number(socialsecurityexpenseIIIICAmount.toFixed(2))
        //工伤保险后调个人金额
        let socialsecurityexpenseAPAAWIInsurance = (re.socialsecurityexpenseICIBAdjustment * socialsecurityexpenseICIICRatio)
        socialsecurityexpenseAPAAWIInsurance=Number(socialsecurityexpenseAPAAWIInsurance.toFixed(2))
        //工伤保险合计缴纳金额
        let socialsecurityexpenseTPAIIInsurance = (socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseIIIICAmount)
        //工伤保险后调金额
        let socialsecurityexpenseAAWIInsurance = (socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAPAAWIInsurance)


        //失业保险单位代缴金额
        let socialsecurityexpenseAPUIUnit = (re.socialsecurityexpenseUICBase * socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAPUIUnit=Number(socialsecurityexpenseAPUIUnit.toFixed(2))
        //失业保险后调单位金额
        let socialsecurityexpenseAUAAUInsurance = (re.socialsecurityexpenseUIBWRBack * socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAUAAUInsurance=Number(socialsecurityexpenseAUAAUInsurance.toFixed(2))
        //失业保险个人缴费金额
        let socialsecurityexpenseUIICAmount = (re.socialsecurityexpenseUICBase * socialsecurityexpenseUIICRatio)
        socialsecurityexpenseUIICAmount=Number(socialsecurityexpenseUIICAmount.toFixed(2))
        //失业保险后调个人金额
        let socialsecurityexpenseAPAAUInsurance = (re.socialsecurityexpenseUIBWRBack * socialsecurityexpenseUIICRatio)
        socialsecurityexpenseAPAAUInsurance=Number(socialsecurityexpenseAPAAUInsurance.toFixed(2))
        //失业保险合计缴费金额
        let socialsecurityexpenseTCUInsurance = (socialsecurityexpenseAPUIUnit + socialsecurityexpenseUIICAmount)
        //失业保险后调合计缴费金
        let socialsecurityexpenseATAUIPayment = (socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseAPAAUInsurance)


        //住房公积金单位带缴金额
        let socialsecurityexpenseHAFPAmount = (re.socialsecurityexpenseHAFPBase * socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFPAmount=Number(socialsecurityexpenseHAFPAmount.toFixed(0))
        //住房公积金后调单位金额
        let socialsecurityexpenseHAFAAUAmount = (re.socialsecurityexpenseHRBAdjustment * socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFAAUAmount=Number(socialsecurityexpenseHAFAAUAmount.toFixed(0))
        //住房公积个人缴费金额
        let socialsecurityexpenseAPIHReserves = (re.socialsecurityexpenseHAFPBase * socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseAPIHReserves=Number(socialsecurityexpenseAPIHReserves.toFixed(0))
        //住房公积个后调人金额
        let socialsecurityexpenseHRATAmount = (re.socialsecurityexpenseHRBAdjustment * socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseHRATAmount=Number(socialsecurityexpenseHRATAmount.toFixed(0))
        //住房公积合计合计缴费金额
        let socialsecurityexpenseHRTTAPayment = (socialsecurityexpenseHAFPAmount + socialsecurityexpenseAPIHReserves)
        //住房公积合计后调合计金额
        let socialsecurityexpenseTAHRAATotal = (socialsecurityexpenseHAFAAUAmount + socialsecurityexpenseHRATAmount)



        //单位代缴金额合计
        let socialsecurityexpenseTAPUit = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAPMIUnit + socialsecurityexpenseAPMDCUnit + socialsecurityexpenseAPBMIUnit + socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseAPUIUnit + socialsecurityexpenseHAFPAmount+re.socialsecurityexpenseManagementFPBase)

        //后调单位金额合计
        let socialsecurityexpenseTUALater = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAUAABInsurance + socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseHAFAAUAmount)

        //个人缴费金额合计
        let socialsecurityexpenseTAPIndividuals = (socialsecurityexpenseAOICEOInsurance + socialsecurityexpenseAICMInsurance + socialsecurityexpenseMIPIPAmount + socialsecurityexpenseICMInsurance + socialsecurityexpenseIIIICAmount + socialsecurityexpenseUIICAmount + socialsecurityexpenseAPIHReserves)
        //后调个人金额合计
        let socialsecurityexpenseTPAALater = (socialsecurityexpenseAAIPAEInsurance + socialsecurityexpenseAPAAMInsurance + socialsecurityexpenseAPAASIWhole + socialsecurityexpenseAIAABInsurance + socialsecurityexpenseAPAAWIInsurance + socialsecurityexpenseAPAAUInsurance + socialsecurityexpenseHRATAmount)

        //合计缴费金额合计
        let socialsecurityexpenseTAPTAPayment = (socialsecurityexpenseTCAEInsurance + socialsecurityexpenseTCMInsurance + socialsecurityexpenseTAPSDiseases + socialsecurityexpenseTPOMInsurance + socialsecurityexpenseTPAIIInsurance + socialsecurityexpenseTCUInsurance + socialsecurityexpenseHRTTAPayment+re.socialsecurityexpenseManagementFPBase)

        //后调缴费金额合计
        let socialsecurityexpenseTAPAAdjustment = (socialsecurityexpenseTAPIAAdjustment + socialsecurityexpenseMIATotal + socialsecurityexpenseATASIAOPlanning + socialsecurityexpenseTAAMInsurance + socialsecurityexpenseAAWIInsurance + socialsecurityexpenseATAUIPayment + socialsecurityexpenseTAHRAATotal)

        //补差

        //补差个人部分养老
        let makeupPersonalOldage =((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * socialsecurityexpensePEIPIndividual);
        makeupPersonalOldage=Number(makeupPersonalOldage.toFixed(2))
        //补差个人部分医疗
        let makeupPersonalMedical =((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) *socialsecurityexpenseMIICRatio);
        makeupPersonalMedical=Number(makeupPersonalMedical.toFixed(2))
        //补差个人部分大病
        let makeupPersonalSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *socialsecurityexpenseSIIPProportion);
        makeupPersonalSeriousIllness=Number(makeupPersonalSeriousIllness.toFixed(2))
        //补差个人部分失业
        let makeupPersonalUnemployment = ((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) * socialsecurityexpenseUIICRatio);
        makeupPersonalUnemployment=Number(makeupPersonalUnemployment.toFixed(2))
        //补差个人部分公积金
        let makeupPersonalProvidentfund =((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) * socialsecurityexpensePHRPIndividuals);
        makeupPersonalProvidentfund=Number(makeupPersonalProvidentfund.toFixed(2))
        //补差个人部分小计
        let makeupPersonalSubtotal=(makeupPersonalOldage+makeupPersonalMedical+makeupPersonalSeriousIllness+makeupPersonalUnemployment+makeupPersonalProvidentfund);


        //补差单位部分养老
        let makeupUnitOldage=((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * socialsecurityexpenseEIUPProportion)
        makeupUnitOldage=Number(makeupUnitOldage.toFixed(2))
        //补差单位部分医疗
        let makeupUnitMedical=((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) * socialsecurityexpenseMIUPProportion)
        makeupUnitMedical=Number(makeupUnitMedical.toFixed(2))
        //补差单位部分大病
        let makeupUnitSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *socialsecurityexpensePSIPUnit)
        makeupUnitSeriousIllness=Number(makeupUnitSeriousIllness.toFixed(2))
        //补差单位部分生育
        let makeupUnitGivebBirth=((re.socialsecurityexpenseBIABAfter -re.socialsecurityexpenseCBMInsurance) *socialsecurityexpensePMIUnits)
        makeupUnitGivebBirth=Number(makeupUnitGivebBirth.toFixed(2))
        //补差单位部分失业
        let makeupUnitUnemployment=((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) *socialsecurityexpenseUIUPProportion)
        makeupUnitUnemployment=Number(makeupUnitUnemployment.toFixed(2))
        //补差单位部分工伤
        let makeupUnitWorkInjury=((re.socialsecurityexpenseICIBAdjustment -re.socialsecurityexpenseBICIContributions)*socialsecurityexpensePICIUnits)
        makeupUnitWorkInjury=Number(makeupUnitWorkInjury.toFixed(2))
        //补差单位部分公积金
        let makeupUnitProvidentfund=((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) *socialsecurityexpensePPHUnits)
        makeupUnitProvidentfund=Number(makeupUnitProvidentfund.toFixed(2))
        //补差单位部分小计
        let makeupUnitSubtotal=(makeupUnitOldage+makeupUnitMedical+makeupUnitSeriousIllness+makeupUnitGivebBirth+makeupUnitUnemployment+makeupUnitWorkInjury+makeupUnitProvidentfund)
        //补差合计
        let differencestatement=(makeupPersonalSubtotal+makeupUnitSubtotal)

        //截取时间
        let baiduName = da.socialsecurityexpenseDate.substring(0, 7)



        const upd = await CONNECTION
            .createQueryBuilder()
            .update(socialsecurityexpense)
            .set({
                socialsecurityexpenseDate: baiduName,
                socialsecurityexpenseACWageBase: re.socialsecurityexpenseACWageBase,
                socialsecurityexpenseBaseAdjustment: re.socialsecurityexpenseBaseAdjustment,
                socialsecurityexpenseEICbase: re.socialsecurityexpenseEICbase,
                socialsecurityexpenseEIALater: re.socialsecurityexpenseEIALater,
                socialsecurityexpenseEILabel: re.socialsecurityexpenseEILabel,
                socialsecurityexpenseEIUPProportion: socialsecurityexpenseEIUPProportion,
                socialsecurityexpenseAICEInsurance: socialsecurityexpenseAICEInsurance1,
                socialsecurityexpenseAUAAEInsurance: socialsecurityexpenseAUAAEInsurance,
                socialsecurityexpensePEIPIndividual: socialsecurityexpensePEIPIndividual,
                socialsecurityexpenseAOICEOInsurance: socialsecurityexpenseAOICEOInsurance,
                socialsecurityexpenseAAIPAEInsurance: socialsecurityexpenseAAIPAEInsurance,
                socialsecurityexpenseTPEInsurance: socialsecurityexpenseTPEInsurance,
                socialsecurityexpenseTCAEInsurance: socialsecurityexpenseTCAEInsurance,
                socialsecurityexpenseTAPIAAdjustment: socialsecurityexpenseTAPIAAdjustment,
                socialsecurityexpenseMICBase: re.socialsecurityexpenseMICBase,
                socialsecurityexpenseMIBAdjustment: re.socialsecurityexpenseMIBAdjustment,
                socialsecurityexpenseMIUPProportion: socialsecurityexpenseMIUPProportion,
                socialsecurityexpenseAPMIUnit: socialsecurityexpenseAPMIUnit,
                socialsecurityexpenseAUAAMInsurance: socialsecurityexpenseAUAAMInsurance,
                socialsecurityexpenseMIICRatio: socialsecurityexpenseMIICRatio,
                socialsecurityexpenseAICMInsurance: socialsecurityexpenseAICMInsurance,
                socialsecurityexpenseAPAAMInsurance: socialsecurityexpenseAPAAMInsurance,
                socialsecurityexpenseTPMInsurance: socialsecurityexpenseTPMInsurance,
                socialsecurityexpenseTCMInsurance: socialsecurityexpenseTCMInsurance,
                socialsecurityexpenseMIATotal: socialsecurityexpenseMIATotal,
                socialsecurityexpenseTOPBSBiseases: re.socialsecurityexpenseTOPBSBiseases,
                socialsecurityexpenseASIOABase: re.socialsecurityexpenseASIOABase,
                socialsecurityexpensePSIPUnit: socialsecurityexpensePSIPUnit,
                socialsecurityexpenseAPMDCUnit: socialsecurityexpenseAPMDCUnit,
                socialsecurityexpenseASIOAUAmount: socialsecurityexpenseASIOAUAmount,
                socialsecurityexpenseSIIPProportion: socialsecurityexpenseSIIPProportion,
                socialsecurityexpenseMIPIPAmount: socialsecurityexpenseMIPIPAmount,
                socialsecurityexpenseAPAASIWhole: socialsecurityexpenseAPAASIWhole,
                socialsecurityexpensePOPSDiseases: socialsecurityexpensePOPSDiseases,
                socialsecurityexpenseTAPSDiseases: socialsecurityexpenseTAPSDiseases,
                socialsecurityexpenseATASIAOPlanning: socialsecurityexpenseATASIAOPlanning,
                socialsecurityexpenseCBMInsurance: re.socialsecurityexpenseCBMInsurance,
                socialsecurityexpenseBIABAfter: re.socialsecurityexpenseBIABAfter,
                socialsecurityexpensePMIUnits: socialsecurityexpensePMIUnits,
                socialsecurityexpenseAPBMIUnit: socialsecurityexpenseAPBMIUnit,
                socialsecurityexpenseAUAABInsurance: socialsecurityexpenseAUAABInsurance,
                socialsecurityexpensePIPMInsurance: socialsecurityexpensePIPMInsurance,
                socialsecurityexpenseICMInsurance: socialsecurityexpenseICMInsurance,
                socialsecurityexpenseAIAABInsurance: socialsecurityexpenseAIAABInsurance,
                socialsecurityexpensePOMInsurance: socialsecurityexpensePOMInsurance,
                socialsecurityexpenseTPOMInsurance: socialsecurityexpenseTPOMInsurance,
                socialsecurityexpenseTAAMInsurance: socialsecurityexpenseTAAMInsurance,
                socialsecurityexpenseBICIContributions: re.socialsecurityexpenseBICIContributions,
                socialsecurityexpenseICIBAdjustment: re.socialsecurityexpenseICIBAdjustment,
                socialsecurityexpensePICIUnits: socialsecurityexpensePICIUnits,
                socialsecurityexpenseAPIIIIUnit: socialsecurityexpenseAPIIIIUnit,
                socialsecurityexpenseIIIAUAmount: socialsecurityexpenseIIIAUAmount,
                socialsecurityexpensePICIStatements: socialsecurityexpensePICIStatements,
                socialsecurityexpenseICIICRatio: socialsecurityexpenseICIICRatio,
                socialsecurityexpenseIIIICAmount: socialsecurityexpenseIIIICAmount,
                socialsecurityexpenseAPAAWIInsurance: socialsecurityexpenseAPAAWIInsurance,
                socialsecurityexpenseTPIIInsurance: socialsecurityexpenseTPIIInsurance,
                socialsecurityexpenseTPAIIInsurance: socialsecurityexpenseTPAIIInsurance,
                socialsecurityexpenseAAWIInsurance: socialsecurityexpenseAAWIInsurance,
                socialsecurityexpenseUICBase: re.socialsecurityexpenseUICBase,
                socialsecurityexpenseUIBWRBack: re.socialsecurityexpenseUIBWRBack,
                socialsecurityexpenseUIUPProportion: socialsecurityexpenseUIUPProportion,
                socialsecurityexpenseAPUIUnit: socialsecurityexpenseAPUIUnit,
                socialsecurityexpenseAUAAUInsurance: socialsecurityexpenseAUAAUInsurance,
                socialsecurityexpenseUIICRatio: socialsecurityexpenseUIICRatio,
                socialsecurityexpenseUIICAmount: socialsecurityexpenseUIICAmount,
                socialsecurityexpenseAPAAUInsurance: socialsecurityexpenseAPAAUInsurance,
                socialsecurityexpenseTPUInsurance: socialsecurityexpenseTPUInsurance,
                socialsecurityexpenseTCUInsurance: socialsecurityexpenseTCUInsurance,
                socialsecurityexpenseATAUIPayment: socialsecurityexpenseATAUIPayment,
                socialsecurityexpenseHAFPBase: re.socialsecurityexpenseHAFPBase,
                socialsecurityexpenseHRBAdjustment: re.socialsecurityexpenseHRBAdjustment,
                socialsecurityexpensePPHUnits: socialsecurityexpensePPHUnits,
                socialsecurityexpenseHAFPAmount: socialsecurityexpenseHAFPAmount,
                socialsecurityexpenseHAFAAUAmount: socialsecurityexpenseHAFAAUAmount,
                socialsecurityexpensePHRPIndividuals: socialsecurityexpensePHRPIndividuals,
                socialsecurityexpenseAPIHReserves: socialsecurityexpenseAPIHReserves,
                socialsecurityexpenseHRATAmount: socialsecurityexpenseHRATAmount,
                socialsecurityexpenseTPHReserves: socialsecurityexpenseTPHReserves,
                socialsecurityexpenseHRTTAPayment: socialsecurityexpenseHRTTAPayment,
                socialsecurityexpenseTAHRAATotal: socialsecurityexpenseTAHRAATotal,
                socialsecurityexpenseManagementFPBase: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseAMFPUnit: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseTAMFPaid: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseASSWage: re.socialsecurityexpenseASSWage,
                socialsecurityexpensePFSalary: re.socialsecurityexpensePFSalary,
                socialsecurityexpenseTAPUit: socialsecurityexpenseTAPUit,
                socialsecurityexpenseTUALater: socialsecurityexpenseTUALater,
                socialsecurityexpenseTAPIndividuals: socialsecurityexpenseTAPIndividuals,
                socialsecurityexpenseTPAALater: socialsecurityexpenseTPAALater,
                socialsecurityexpenseTAPTAPayment: socialsecurityexpenseTAPTAPayment,
                socialsecurityexpenseTAPAAdjustment: socialsecurityexpenseTAPAAdjustment,
                employeeregistrationformIDNumber: re.employeeregistrationformIDNumber
            })
            .where({socialsecurityexpenseDate: baiduName})
            .andWhere({employeeregistrationformIDNumber: re.employeeregistrationformIDNumber})
            .execute();

        const updsocifee = await CONNECTION
            .createQueryBuilder()
            .update(socialsecurityfee)
            .set({
                employeeregistrationformFileNumber: re.employeeregistrationformFileNumber,
                employeeregistrationformName: re.employeeregistrationformName,
                makeupPersonalOldage: makeupPersonalOldage,
                makeupPersonalMedical: makeupPersonalMedical,
                makeupPersonalSeriousIllness: makeupPersonalSeriousIllness,
                makeupPersonalUnemployment: makeupPersonalUnemployment,
                makeupPersonalProvidentfund: makeupPersonalProvidentfund,
                makeupPersonalSubtotal: makeupPersonalSubtotal,
                makeupUnitOldage: makeupUnitOldage,
                makeupUnitMedical: makeupUnitMedical,
                makeupUnitSeriousIllness: makeupUnitSeriousIllness,
                makeupUnitGivebBirth: makeupUnitGivebBirth,
                makeupUnitUnemployment: makeupUnitUnemployment,
                makeupUnitWorkInjury: makeupUnitWorkInjury,
                makeupUnitProvidentfund: makeupUnitProvidentfund,
                makeupUnitSubtotal: makeupUnitSubtotal,
                differencestatement: differencestatement,
                corporateInformationTradeName: re.corporateInformationTradeName,
                employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                socialsecurityexpenseDate: baiduName
            })
            .where({socialsecurityexpenseDate: baiduName})
            .andWhere({employeeregistrationformIDNumber: re.employeeregistrationformIDNumber})
            .execute();
        if (upd.affected == 1 && updsocifee.affected == 1) {
            return {state: stat.succeed}
        } else {
            return {state: stat.defeated}
        }
    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  updsoci ---------",e)
        return {state: stat.defeated}
    }
}


//修改多条数据
export function  dg(sz){
    let reqs=[]
    if (sz.length>300){
        for(var i=0;i<30;i++){
            let k=updsoc(sz[i],sz[i].socialsecurityexpenseDate);
            reqs.push(k);
            sz.splice(i,1);
            console.log(sz.length);
        }
        Promise.all(reqs).then((da)=>{
            this.dg(sz);
        });
    }else if (sz.length>0&&sz.length<300){

        for(var i=0;i<sz.length;i++){
            let k=updsoc(sz[i],sz[i].socialsecurityexpenseDate);
            reqs.push(k);
            sz.splice(i,1);
            console.log(sz.length,"-2")
        }
        Promise.all(reqs).then((da)=>{
            this.dg(sz);
            return sz;
        });
    }
}


export async function updsoc(re,socialsecurityexpenseDate){
    try {
        //养老保险单位代缴金额
        let socialsecurityexpenseAICEInsurance1 = ( (re.socialsecurityexpenseEICbase * re.socialsecurityexpenseEIUPProportion))
        socialsecurityexpenseAICEInsurance1=Number(socialsecurityexpenseAICEInsurance1.toFixed(2))
        //养老保险后调单位金额
        let socialsecurityexpenseAUAAEInsurance = (re.socialsecurityexpenseEIALater * re.socialsecurityexpenseEIUPProportion)
        socialsecurityexpenseAUAAEInsurance=Number(socialsecurityexpenseAUAAEInsurance.toFixed(2))
        //养老保险个人缴费金额
        let socialsecurityexpenseAOICEOInsurance = (re.socialsecurityexpenseEICbase * re.socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAOICEOInsurance=Number(socialsecurityexpenseAOICEOInsurance.toFixed(2))
        //养老保险后调个人缴费金
        let socialsecurityexpenseAAIPAEInsurance = (re.socialsecurityexpenseEIALater * re.socialsecurityexpensePEIPIndividual)
        socialsecurityexpenseAAIPAEInsurance=Number(socialsecurityexpenseAAIPAEInsurance.toFixed(2))
        //养老保险合计缴费金额
        let socialsecurityexpenseTCAEInsurance = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAOICEOInsurance)
        //养老保险后调合计金额
        let socialsecurityexpenseTAPIAAdjustment = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAAIPAEInsurance)


        //医疗保险单位代缴金额
        let socialsecurityexpenseAPMIUnit = (re.socialsecurityexpenseMICBase * re.socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAPMIUnit=Number(socialsecurityexpenseAPMIUnit.toFixed(2))
        //医疗保险后调单位金额
        let socialsecurityexpenseAUAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * re.socialsecurityexpenseMIUPProportion)
        socialsecurityexpenseAUAAMInsurance=Number(socialsecurityexpenseAUAAMInsurance.toFixed(2))
        //医疗保险个人缴费金额
        let socialsecurityexpenseAICMInsurance = (re.socialsecurityexpenseMICBase * re.socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAICMInsurance=Number(socialsecurityexpenseAICMInsurance.toFixed(2))
        //医疗保险后调个人金额
        let socialsecurityexpenseAPAAMInsurance = (re.socialsecurityexpenseMIBAdjustment * re.socialsecurityexpenseMIICRatio)
        socialsecurityexpenseAPAAMInsurance=Number(socialsecurityexpenseAPAAMInsurance.toFixed(2))
        //医疗保险合计缴费金额
        let socialsecurityexpenseTCMInsurance = (socialsecurityexpenseAPMIUnit + socialsecurityexpenseAICMInsurance)
        //医疗保险后调合计金额
        let socialsecurityexpenseMIATotal = (socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseAPAAMInsurance)


        //大病统筹单位代缴金额
        let socialsecurityexpenseAPMDCUnit = (re.socialsecurityexpenseTOPBSBiseases * re.socialsecurityexpensePSIPUnit)
        socialsecurityexpenseAPMDCUnit=Number(socialsecurityexpenseAPMDCUnit.toFixed(2))
        //大病统筹后调单位金额
        let socialsecurityexpenseASIOAUAmount = (re.socialsecurityexpenseASIOABase * re.socialsecurityexpensePSIPUnit)
        socialsecurityexpenseASIOAUAmount=Number(socialsecurityexpenseASIOAUAmount.toFixed(2))
        //大病统筹个人缴费金额
        let socialsecurityexpenseMIPIPAmount = (re.socialsecurityexpenseTOPBSBiseases * re.socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseMIPIPAmount=Number(socialsecurityexpenseMIPIPAmount.toFixed(2))
        //大病统筹后调个人金额
        let socialsecurityexpenseAPAASIWhole = (re.socialsecurityexpenseASIOABase * re.socialsecurityexpenseSIIPProportion)
        socialsecurityexpenseAPAASIWhole=Number(socialsecurityexpenseAPAASIWhole.toFixed(2))
        //大病统筹合计缴费金额
        let socialsecurityexpenseTAPSDiseases = (socialsecurityexpenseAPMDCUnit + socialsecurityexpenseMIPIPAmount)
        //大病统筹后调合计金额
        let socialsecurityexpenseATASIAOPlanning = (socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAPAASIWhole)


        //生育保险单位代缴金额
        let socialsecurityexpenseAPBMIUnit = (re.socialsecurityexpenseCBMInsurance * re.socialsecurityexpensePMIUnits)
        socialsecurityexpenseAPBMIUnit=Number(socialsecurityexpenseAPBMIUnit.toFixed(2))
        //生育保险后调单位金额
        let socialsecurityexpenseAUAABInsurance = (re.socialsecurityexpenseBIABAfter * re.socialsecurityexpensePMIUnits)
        socialsecurityexpenseAUAABInsurance=Number(socialsecurityexpenseAUAABInsurance.toFixed(2))
        //生育保险个人缴费金额
        let socialsecurityexpenseICMInsurance = (re.socialsecurityexpenseCBMInsurance * re.socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseICMInsurance=Number(socialsecurityexpenseICMInsurance.toFixed(2))
        //生育保险后调个人金额
        let socialsecurityexpenseAIAABInsurance = (re.socialsecurityexpenseBIABAfter * re.socialsecurityexpensePIPMInsurance)
        socialsecurityexpenseAIAABInsurance=Number(socialsecurityexpenseAIAABInsurance.toFixed(2))
        //生育保险合计缴费金额
        let socialsecurityexpenseTPOMInsurance = (socialsecurityexpenseAPBMIUnit + socialsecurityexpenseICMInsurance)
        //生育保险后调合计金额
        let socialsecurityexpenseTAAMInsurance = (socialsecurityexpenseAUAABInsurance + socialsecurityexpenseAIAABInsurance)


        //工伤保险单位代缴金额
        let socialsecurityexpenseAPIIIIUnit = (re.socialsecurityexpenseBICIContributions * re.socialsecurityexpensePICIUnits)
        socialsecurityexpenseAPIIIIUnit=Number(socialsecurityexpenseAPIIIIUnit.toFixed(2))
        //工伤保险后调单位金额
        let socialsecurityexpenseIIIAUAmount = (re.socialsecurityexpenseICIBAdjustment * re.socialsecurityexpensePICIUnits)
        socialsecurityexpenseIIIAUAmount=Number(socialsecurityexpenseIIIAUAmount.toFixed(2))
        //工伤保险个人缴费金额
        let socialsecurityexpenseIIIICAmount = (re.socialsecurityexpenseBICIContributions * re.socialsecurityexpenseICIICRatio)
        socialsecurityexpenseIIIICAmount=Number(socialsecurityexpenseIIIICAmount.toFixed(2))
        //工伤保险后调个人金额
        let socialsecurityexpenseAPAAWIInsurance = (re.socialsecurityexpenseICIBAdjustment * re.socialsecurityexpenseICIICRatio)
        socialsecurityexpenseAPAAWIInsurance=Number(socialsecurityexpenseAPAAWIInsurance.toFixed(2))
        //工伤保险合计缴纳金额
        let socialsecurityexpenseTPAIIInsurance = (socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseIIIICAmount)
        //工伤保险后调金额
        let socialsecurityexpenseAAWIInsurance = (socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAPAAWIInsurance)


        //失业保险单位代缴金额
        let socialsecurityexpenseAPUIUnit = (re.socialsecurityexpenseUICBase * re.socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAPUIUnit=Number(socialsecurityexpenseAPUIUnit.toFixed(2))
        //失业保险后调单位金额
        let socialsecurityexpenseAUAAUInsurance = (re.socialsecurityexpenseUIBWRBack * re.socialsecurityexpenseUIUPProportion)
        socialsecurityexpenseAUAAUInsurance=Number(socialsecurityexpenseAUAAUInsurance.toFixed(2))
        //失业保险个人缴费金额
        let socialsecurityexpenseUIICAmount = (re.socialsecurityexpenseUICBase * re.socialsecurityexpenseUIICRatio)
        socialsecurityexpenseUIICAmount=Number(socialsecurityexpenseUIICAmount.toFixed(2))
        //失业保险后调个人金额
        let socialsecurityexpenseAPAAUInsurance = (re.socialsecurityexpenseUIBWRBack * re.socialsecurityexpenseUIICRatio)
        socialsecurityexpenseAPAAUInsurance=Number(socialsecurityexpenseAPAAUInsurance.toFixed(2))
        //失业保险合计缴费金额
        let socialsecurityexpenseTCUInsurance = (socialsecurityexpenseAPUIUnit + socialsecurityexpenseUIICAmount)
        //失业保险后调合计缴费金
        let socialsecurityexpenseATAUIPayment = (socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseAPAAUInsurance)


        //住房公积金单位带缴金额
        let socialsecurityexpenseHAFPAmount = (re.socialsecurityexpenseHAFPBase * re.socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFPAmount=Number(socialsecurityexpenseHAFPAmount.toFixed(0))
        //住房公积金后调单位金额
        let socialsecurityexpenseHAFAAUAmount = (re.socialsecurityexpenseHRBAdjustment * re.socialsecurityexpensePPHUnits)
        socialsecurityexpenseHAFAAUAmount=Number(socialsecurityexpenseHAFAAUAmount.toFixed(0))
        //住房公积个人缴费金额
        let socialsecurityexpenseAPIHReserves = (re.socialsecurityexpenseHAFPBase * re.socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseAPIHReserves=Number(socialsecurityexpenseAPIHReserves.toFixed(0))
        //住房公积个后调人金额
        let socialsecurityexpenseHRATAmount = (re.socialsecurityexpenseHRBAdjustment * re.socialsecurityexpensePHRPIndividuals)
        socialsecurityexpenseHRATAmount=Number(socialsecurityexpenseHRATAmount.toFixed(0))
        //住房公积合计合计缴费金额
        let socialsecurityexpenseHRTTAPayment = (socialsecurityexpenseHAFPAmount + socialsecurityexpenseAPIHReserves)
        //住房公积合计后调合计金额
        let socialsecurityexpenseTAHRAATotal = (socialsecurityexpenseHAFAAUAmount + socialsecurityexpenseHRATAmount)



        //单位代缴金额合计
        let socialsecurityexpenseTAPUit = (socialsecurityexpenseAICEInsurance1 + socialsecurityexpenseAPMIUnit + socialsecurityexpenseAPMDCUnit + socialsecurityexpenseAPBMIUnit + socialsecurityexpenseAPIIIIUnit + socialsecurityexpenseAPUIUnit + socialsecurityexpenseHAFPAmount+re.socialsecurityexpenseManagementFPBase)

        //后调单位金额合计
        let socialsecurityexpenseTUALater = (socialsecurityexpenseAUAAEInsurance + socialsecurityexpenseAUAAMInsurance + socialsecurityexpenseASIOAUAmount + socialsecurityexpenseAUAABInsurance + socialsecurityexpenseIIIAUAmount + socialsecurityexpenseAUAAUInsurance + socialsecurityexpenseHAFAAUAmount)

        //个人缴费金额合计
        let socialsecurityexpenseTAPIndividuals = (socialsecurityexpenseAOICEOInsurance + socialsecurityexpenseAICMInsurance + socialsecurityexpenseMIPIPAmount + socialsecurityexpenseICMInsurance + socialsecurityexpenseIIIICAmount + socialsecurityexpenseUIICAmount + socialsecurityexpenseAPIHReserves)
        //后调个人金额合计
        let socialsecurityexpenseTPAALater = (socialsecurityexpenseAAIPAEInsurance + socialsecurityexpenseAPAAMInsurance + socialsecurityexpenseAPAASIWhole + socialsecurityexpenseAIAABInsurance + socialsecurityexpenseAPAAWIInsurance + socialsecurityexpenseAPAAUInsurance + socialsecurityexpenseHRATAmount)

        //合计缴费金额合计
        let socialsecurityexpenseTAPTAPayment = (socialsecurityexpenseTCAEInsurance + socialsecurityexpenseTCMInsurance + socialsecurityexpenseTAPSDiseases + socialsecurityexpenseTPOMInsurance + socialsecurityexpenseTPAIIInsurance + socialsecurityexpenseTCUInsurance + socialsecurityexpenseHRTTAPayment+re.socialsecurityexpenseManagementFPBase)

        //后调缴费金额合计
        let socialsecurityexpenseTAPAAdjustment = (socialsecurityexpenseTAPIAAdjustment + socialsecurityexpenseMIATotal + socialsecurityexpenseATASIAOPlanning + socialsecurityexpenseTAAMInsurance + socialsecurityexpenseAAWIInsurance + socialsecurityexpenseATAUIPayment + socialsecurityexpenseTAHRAATotal)

        //补差

        //补差个人部分养老
        let makeupPersonalOldage =((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * re.socialsecurityexpensePEIPIndividual);
        makeupPersonalOldage=Number(makeupPersonalOldage.toFixed(2))
        //补差个人部分医疗
        let makeupPersonalMedical =((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) *re.socialsecurityexpenseMIICRatio);
        makeupPersonalMedical=Number(makeupPersonalMedical.toFixed(2))
        //补差个人部分大病
        let makeupPersonalSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *re.socialsecurityexpenseSIIPProportion);
        makeupPersonalSeriousIllness=Number(makeupPersonalSeriousIllness.toFixed(2))
        //补差个人部分失业
        let makeupPersonalUnemployment = ((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) * re.socialsecurityexpenseUIICRatio);
        makeupPersonalUnemployment=Number(makeupPersonalUnemployment.toFixed(2))
        //补差个人部分公积金
        let makeupPersonalProvidentfund =((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) * re.socialsecurityexpensePHRPIndividuals);
        makeupPersonalProvidentfund=Number(makeupPersonalProvidentfund.toFixed(2))
        //补差个人部分小计
        let makeupPersonalSubtotal=(makeupPersonalOldage+makeupPersonalMedical+makeupPersonalSeriousIllness+makeupPersonalUnemployment+makeupPersonalProvidentfund);


        //补差单位部分养老
        let makeupUnitOldage=((re.socialsecurityexpenseEIALater - re.socialsecurityexpenseEICbase) * re.socialsecurityexpenseEIUPProportion)
        makeupUnitOldage=Number(makeupUnitOldage.toFixed(2))
        //补差单位部分医疗
        let makeupUnitMedical=((re.socialsecurityexpenseMIBAdjustment - re.socialsecurityexpenseMICBase) * re.socialsecurityexpenseMIUPProportion)
        makeupUnitMedical=Number(makeupUnitMedical.toFixed(2))
        //补差单位部分大病
        let makeupUnitSeriousIllness=((re.socialsecurityexpenseASIOABase - re.socialsecurityexpenseTOPBSBiseases) *re.socialsecurityexpensePSIPUnit)
        makeupUnitSeriousIllness=Number(makeupUnitSeriousIllness.toFixed(2))
        //补差单位部分生育
        let makeupUnitGivebBirth=((re.socialsecurityexpenseBIABAfter -re.socialsecurityexpenseCBMInsurance) *re.socialsecurityexpensePMIUnits)
        makeupUnitGivebBirth=Number(makeupUnitGivebBirth.toFixed(2))
        //补差单位部分失业
        let makeupUnitUnemployment=((re.socialsecurityexpenseUIBWRBack - re.socialsecurityexpenseUICBase) *re.socialsecurityexpenseUIUPProportion)
        makeupUnitUnemployment=Number(makeupUnitUnemployment.toFixed(2))
        //补差单位部分工伤
        let makeupUnitWorkInjury=((re.socialsecurityexpenseICIBAdjustment -re.socialsecurityexpenseBICIContributions)*re.socialsecurityexpensePICIUnits)
        makeupUnitWorkInjury=Number(makeupUnitWorkInjury.toFixed(2))
        //补差单位部分公积金
        let makeupUnitProvidentfund=((re.socialsecurityexpenseHRBAdjustment - re.socialsecurityexpenseHAFPBase) *re.socialsecurityexpensePPHUnits)
        makeupUnitProvidentfund=Number(makeupUnitProvidentfund.toFixed(2))
        //补差单位部分小计
        let makeupUnitSubtotal=(makeupUnitOldage+makeupUnitMedical+makeupUnitSeriousIllness+makeupUnitGivebBirth+makeupUnitUnemployment+makeupUnitWorkInjury+makeupUnitProvidentfund)
        //补差合计
        let differencestatement=(makeupPersonalSubtotal+makeupUnitSubtotal)

        //截取时间
        let baiduName = socialsecurityexpenseDate.substring(0, 7)


        const upd = await CONNECTION
            .createQueryBuilder()
            .update(socialsecurityexpense)
            .set({
                socialsecurityexpenseDate: baiduName,
                socialsecurityexpenseACWageBase: re.socialsecurityexpenseACWageBase,
                socialsecurityexpenseBaseAdjustment: re.socialsecurityexpenseBaseAdjustment,
                socialsecurityexpenseEICbase: re.socialsecurityexpenseEICbase,
                socialsecurityexpenseEIALater: re.socialsecurityexpenseEIALater,
                socialsecurityexpenseEILabel: re.socialsecurityexpenseEILabel,
                socialsecurityexpenseEIUPProportion: re.socialsecurityexpenseEIUPProportion,
                socialsecurityexpenseAICEInsurance: socialsecurityexpenseAICEInsurance1,
                socialsecurityexpenseAUAAEInsurance: socialsecurityexpenseAUAAEInsurance,
                socialsecurityexpensePEIPIndividual: re.socialsecurityexpensePEIPIndividual,
                socialsecurityexpenseAOICEOInsurance: socialsecurityexpenseAOICEOInsurance,
                socialsecurityexpenseAAIPAEInsurance: socialsecurityexpenseAAIPAEInsurance,
                socialsecurityexpenseTPEInsurance: re.socialsecurityexpenseTPEInsurance,
                socialsecurityexpenseTCAEInsurance: socialsecurityexpenseTCAEInsurance,
                socialsecurityexpenseTAPIAAdjustment: socialsecurityexpenseTAPIAAdjustment,
                socialsecurityexpenseMICBase: re.socialsecurityexpenseMICBase,
                socialsecurityexpenseMIBAdjustment: re.socialsecurityexpenseMIBAdjustment,
                socialsecurityexpenseMIUPProportion: re.socialsecurityexpenseMIUPProportion,
                socialsecurityexpenseAPMIUnit: socialsecurityexpenseAPMIUnit,
                socialsecurityexpenseAUAAMInsurance: socialsecurityexpenseAUAAMInsurance,
                socialsecurityexpenseMIICRatio: re.socialsecurityexpenseMIICRatio,
                socialsecurityexpenseAICMInsurance: socialsecurityexpenseAICMInsurance,
                socialsecurityexpenseAPAAMInsurance: socialsecurityexpenseAPAAMInsurance,
                socialsecurityexpenseTPMInsurance: re.socialsecurityexpenseTPMInsurance,
                socialsecurityexpenseTCMInsurance: socialsecurityexpenseTCMInsurance,
                socialsecurityexpenseMIATotal: socialsecurityexpenseMIATotal,
                socialsecurityexpenseTOPBSBiseases: re.socialsecurityexpenseTOPBSBiseases,
                socialsecurityexpenseASIOABase: re.socialsecurityexpenseASIOABase,
                socialsecurityexpensePSIPUnit: re.socialsecurityexpensePSIPUnit,
                socialsecurityexpenseAPMDCUnit: socialsecurityexpenseAPMDCUnit,
                socialsecurityexpenseASIOAUAmount: socialsecurityexpenseASIOAUAmount,
                socialsecurityexpenseSIIPProportion: re.socialsecurityexpenseSIIPProportion,
                socialsecurityexpenseMIPIPAmount: socialsecurityexpenseMIPIPAmount,
                socialsecurityexpenseAPAASIWhole: socialsecurityexpenseAPAASIWhole,
                socialsecurityexpensePOPSDiseases: re.socialsecurityexpensePOPSDiseases,
                socialsecurityexpenseTAPSDiseases: socialsecurityexpenseTAPSDiseases,
                socialsecurityexpenseATASIAOPlanning: socialsecurityexpenseATASIAOPlanning,
                socialsecurityexpenseCBMInsurance: re.socialsecurityexpenseCBMInsurance,
                socialsecurityexpenseBIABAfter: re.socialsecurityexpenseBIABAfter,
                socialsecurityexpensePMIUnits: re.socialsecurityexpensePMIUnits,
                socialsecurityexpenseAPBMIUnit: socialsecurityexpenseAPBMIUnit,
                socialsecurityexpenseAUAABInsurance: socialsecurityexpenseAUAABInsurance,
                socialsecurityexpensePIPMInsurance: re.socialsecurityexpensePIPMInsurance,
                socialsecurityexpenseICMInsurance: socialsecurityexpenseICMInsurance,
                socialsecurityexpenseAIAABInsurance: socialsecurityexpenseAIAABInsurance,
                socialsecurityexpensePOMInsurance: re.socialsecurityexpensePOMInsurance,
                socialsecurityexpenseTPOMInsurance: socialsecurityexpenseTPOMInsurance,
                socialsecurityexpenseTAAMInsurance: socialsecurityexpenseTAAMInsurance,
                socialsecurityexpenseBICIContributions: re.socialsecurityexpenseBICIContributions,
                socialsecurityexpenseICIBAdjustment: re.socialsecurityexpenseICIBAdjustment,
                socialsecurityexpensePICIUnits: re.socialsecurityexpensePICIUnits,
                socialsecurityexpenseAPIIIIUnit: socialsecurityexpenseAPIIIIUnit,
                socialsecurityexpenseIIIAUAmount: socialsecurityexpenseIIIAUAmount,
                socialsecurityexpensePICIStatements: re.socialsecurityexpensePICIStatements,
                socialsecurityexpenseICIICRatio: re.socialsecurityexpenseICIICRatio,
                socialsecurityexpenseIIIICAmount: socialsecurityexpenseIIIICAmount,
                socialsecurityexpenseAPAAWIInsurance: socialsecurityexpenseAPAAWIInsurance,
                socialsecurityexpenseTPIIInsurance: re.socialsecurityexpenseTPIIInsurance,
                socialsecurityexpenseTPAIIInsurance: socialsecurityexpenseTPAIIInsurance,
                socialsecurityexpenseAAWIInsurance: socialsecurityexpenseAAWIInsurance,
                socialsecurityexpenseUICBase: re.socialsecurityexpenseUICBase,
                socialsecurityexpenseUIBWRBack: re.socialsecurityexpenseUIBWRBack,
                socialsecurityexpenseUIUPProportion: re.socialsecurityexpenseUIUPProportion,
                socialsecurityexpenseAPUIUnit: socialsecurityexpenseAPUIUnit,
                socialsecurityexpenseAUAAUInsurance: socialsecurityexpenseAUAAUInsurance,
                socialsecurityexpenseUIICRatio: re.socialsecurityexpenseUIICRatio,
                socialsecurityexpenseUIICAmount: socialsecurityexpenseUIICAmount,
                socialsecurityexpenseAPAAUInsurance: socialsecurityexpenseAPAAUInsurance,
                socialsecurityexpenseTPUInsurance: re.socialsecurityexpenseTPUInsurance,
                socialsecurityexpenseTCUInsurance: socialsecurityexpenseTCUInsurance,
                socialsecurityexpenseATAUIPayment: socialsecurityexpenseATAUIPayment,
                socialsecurityexpenseHAFPBase: re.socialsecurityexpenseHAFPBase,
                socialsecurityexpenseHRBAdjustment: re.socialsecurityexpenseHRBAdjustment,
                socialsecurityexpensePPHUnits: re.socialsecurityexpensePPHUnits,
                socialsecurityexpenseHAFPAmount: socialsecurityexpenseHAFPAmount,
                socialsecurityexpenseHAFAAUAmount: socialsecurityexpenseHAFAAUAmount,
                socialsecurityexpensePHRPIndividuals: re.socialsecurityexpensePHRPIndividuals,
                socialsecurityexpenseAPIHReserves: socialsecurityexpenseAPIHReserves,
                socialsecurityexpenseHRATAmount: socialsecurityexpenseHRATAmount,
                socialsecurityexpenseTPHReserves: re.socialsecurityexpenseTPHReserves,
                socialsecurityexpenseHRTTAPayment: socialsecurityexpenseHRTTAPayment,
                socialsecurityexpenseTAHRAATotal: socialsecurityexpenseTAHRAATotal,
                socialsecurityexpenseManagementFPBase: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseAMFPUnit: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseTAMFPaid: re.socialsecurityexpenseManagementFPBase,
                socialsecurityexpenseASSWage: re.socialsecurityexpenseASSWage,
                socialsecurityexpensePFSalary: re.socialsecurityexpensePFSalary,
                socialsecurityexpenseTAPUit: socialsecurityexpenseTAPUit,
                socialsecurityexpenseTUALater: socialsecurityexpenseTUALater,
                socialsecurityexpenseTAPIndividuals: socialsecurityexpenseTAPIndividuals,
                socialsecurityexpenseTPAALater: socialsecurityexpenseTPAALater,
                socialsecurityexpenseTAPTAPayment: socialsecurityexpenseTAPTAPayment,
                socialsecurityexpenseTAPAAdjustment: socialsecurityexpenseTAPAAdjustment,
                employeeregistrationformIDNumber: re.employeeregistrationformIDNumber
            })
            .where({socialsecurityexpenseDate: baiduName})
            .andWhere({employeeregistrationformIDNumber: re.employeeregistrationformIDNumber})
            .execute();

        const updsocifee = await CONNECTION
            .createQueryBuilder()
            .update(socialsecurityfee)
            .set({
                employeeregistrationformFileNumber: re.employeeregistrationformFileNumber,
                employeeregistrationformName: re.employeeregistrationformName,
                makeupPersonalOldage: makeupPersonalOldage,
                makeupPersonalMedical: makeupPersonalMedical,
                makeupPersonalSeriousIllness: makeupPersonalSeriousIllness,
                makeupPersonalUnemployment: makeupPersonalUnemployment,
                makeupPersonalProvidentfund: makeupPersonalProvidentfund,
                makeupPersonalSubtotal: makeupPersonalSubtotal,
                makeupUnitOldage: makeupUnitOldage,
                makeupUnitMedical: makeupUnitMedical,
                makeupUnitSeriousIllness: makeupUnitSeriousIllness,
                makeupUnitGivebBirth: makeupUnitGivebBirth,
                makeupUnitUnemployment: makeupUnitUnemployment,
                makeupUnitWorkInjury: makeupUnitWorkInjury,
                makeupUnitProvidentfund: makeupUnitProvidentfund,
                makeupUnitSubtotal: makeupUnitSubtotal,
                differencestatement: differencestatement,
                corporateInformationTradeName: re.corporateInformationTradeName,
                employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                socialsecurityexpenseDate: baiduName
            })
            .where({socialsecurityexpenseDate: baiduName})
            .andWhere({employeeregistrationformIDNumber: re.employeeregistrationformIDNumber})
            .execute();
        if (upd.affected == 1 && updsocifee.affected == 1) {
            return {state: stat.succeed}
        } else {
            return {state: stat.defeated}
        }

    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  updsoc ---------",e)
        return {state: stat.defeated};
    }
}
//自动生成下个月的社保费用
export async function autoaddso(re,socialsecurityexpenseDate){
    try {


            const adds = await CONNECTION
                .createQueryBuilder()
                .insert()
                .into(socialsecurityexpense)
                .values([{
                    socialsecurityexpenseDate: socialsecurityexpenseDate,
                    socialsecurityexpenseACWageBase: re.socialsecurityexpenseACWageBase,
                    socialsecurityexpenseBaseAdjustment: re.socialsecurityexpenseBaseAdjustment,
                    socialsecurityexpenseEICbase: re.socialsecurityexpenseEICbase,
                    socialsecurityexpenseEIALater: re.socialsecurityexpenseEIALater,
                    socialsecurityexpenseEILabel: re.socialsecurityexpenseEILabel,
                    socialsecurityexpenseEIUPProportion: re.socialsecurityexpenseEIUPProportion,
                    socialsecurityexpenseAICEInsurance: re.socialsecurityexpenseAICEInsurance1,
                    socialsecurityexpenseAUAAEInsurance: re.socialsecurityexpenseAUAAEInsurance,
                    socialsecurityexpensePEIPIndividual: re.socialsecurityexpensePEIPIndividual,
                    socialsecurityexpenseAOICEOInsurance: re.socialsecurityexpenseAOICEOInsurance,
                    socialsecurityexpenseAAIPAEInsurance: re.socialsecurityexpenseAAIPAEInsurance,
                    socialsecurityexpenseTPEInsurance: re.socialsecurityexpenseTPEInsurance,
                    socialsecurityexpenseTCAEInsurance: re.socialsecurityexpenseTCAEInsurance,
                    socialsecurityexpenseTAPIAAdjustment: re.socialsecurityexpenseTAPIAAdjustment,
                    socialsecurityexpenseMICBase: re.socialsecurityexpenseMICBase,
                    socialsecurityexpenseMIBAdjustment: re.socialsecurityexpenseMIBAdjustment,
                    socialsecurityexpenseMIUPProportion: re.socialsecurityexpenseMIUPProportion,
                    socialsecurityexpenseAPMIUnit: re.socialsecurityexpenseAPMIUnit,
                    socialsecurityexpenseAUAAMInsurance: re.socialsecurityexpenseAUAAMInsurance,
                    socialsecurityexpenseMIICRatio: re.socialsecurityexpenseMIICRatio,
                    socialsecurityexpenseAICMInsurance: re.socialsecurityexpenseAICMInsurance,
                    socialsecurityexpenseAPAAMInsurance: re.socialsecurityexpenseAPAAMInsurance,
                    socialsecurityexpenseTPMInsurance: re.socialsecurityexpenseTPMInsurance,
                    socialsecurityexpenseTCMInsurance: re.socialsecurityexpenseTCMInsurance,
                    socialsecurityexpenseMIATotal: re.socialsecurityexpenseMIATotal,
                    socialsecurityexpenseTOPBSBiseases: re.socialsecurityexpenseTOPBSBiseases,
                    socialsecurityexpenseASIOABase: re.socialsecurityexpenseASIOABase,
                    socialsecurityexpensePSIPUnit: re.socialsecurityexpensePSIPUnit,
                    socialsecurityexpenseAPMDCUnit: re.socialsecurityexpenseAPMDCUnit,
                    socialsecurityexpenseASIOAUAmount: re.socialsecurityexpenseASIOAUAmount,
                    socialsecurityexpenseSIIPProportion: re.socialsecurityexpenseSIIPProportion,
                    socialsecurityexpenseMIPIPAmount: re.socialsecurityexpenseMIPIPAmount,
                    socialsecurityexpenseAPAASIWhole: re.socialsecurityexpenseAPAASIWhole,
                    socialsecurityexpensePOPSDiseases: re.socialsecurityexpensePOPSDiseases,
                    socialsecurityexpenseTAPSDiseases: re.socialsecurityexpenseTAPSDiseases,
                    socialsecurityexpenseATASIAOPlanning: re.socialsecurityexpenseATASIAOPlanning,
                    socialsecurityexpenseCBMInsurance: re.socialsecurityexpenseCBMInsurance,
                    socialsecurityexpenseBIABAfter: re.socialsecurityexpenseBIABAfter,
                    socialsecurityexpensePMIUnits: re.socialsecurityexpensePMIUnits,
                    socialsecurityexpenseAPBMIUnit: re.socialsecurityexpenseAPBMIUnit,
                    socialsecurityexpenseAUAABInsurance: re.socialsecurityexpenseAUAABInsurance,
                    socialsecurityexpensePIPMInsurance: re.socialsecurityexpensePIPMInsurance,
                    socialsecurityexpenseICMInsurance: re.socialsecurityexpenseICMInsurance,
                    socialsecurityexpenseAIAABInsurance: re.socialsecurityexpenseAIAABInsurance,
                    socialsecurityexpensePOMInsurance: re.socialsecurityexpensePOMInsurance,
                    socialsecurityexpenseTPOMInsurance: re.socialsecurityexpenseTPOMInsurance,
                    socialsecurityexpenseTAAMInsurance: re.socialsecurityexpenseTAAMInsurance,
                    socialsecurityexpenseBICIContributions: re.socialsecurityexpenseBICIContributions,
                    socialsecurityexpenseICIBAdjustment: re.socialsecurityexpenseICIBAdjustment,
                    socialsecurityexpensePICIUnits: re.socialsecurityexpensePICIUnits,
                    socialsecurityexpenseAPIIIIUnit: re.socialsecurityexpenseAPIIIIUnit,
                    socialsecurityexpenseIIIAUAmount: re.socialsecurityexpenseIIIAUAmount,
                    socialsecurityexpensePICIStatements: re.socialsecurityexpensePICIStatements,
                    socialsecurityexpenseICIICRatio: re.socialsecurityexpenseICIICRatio,
                    socialsecurityexpenseIIIICAmount: re.socialsecurityexpenseIIIICAmount,
                    socialsecurityexpenseAPAAWIInsurance: re.socialsecurityexpenseAPAAWIInsurance,
                    socialsecurityexpenseTPIIInsurance: re.socialsecurityexpenseTPIIInsurance,
                    socialsecurityexpenseTPAIIInsurance: re.socialsecurityexpenseTPAIIInsurance,
                    socialsecurityexpenseAAWIInsurance: re.socialsecurityexpenseAAWIInsurance,
                    socialsecurityexpenseUICBase: re.socialsecurityexpenseUICBase,
                    socialsecurityexpenseUIBWRBack: re.socialsecurityexpenseUIBWRBack,
                    socialsecurityexpenseUIUPProportion: re.socialsecurityexpenseUIUPProportion,
                    socialsecurityexpenseAPUIUnit: re.socialsecurityexpenseAPUIUnit,
                    socialsecurityexpenseAUAAUInsurance: re.socialsecurityexpenseAUAAUInsurance,
                    socialsecurityexpenseUIICRatio: re.socialsecurityexpenseUIICRatio,
                    socialsecurityexpenseUIICAmount: re.socialsecurityexpenseUIICAmount,
                    socialsecurityexpenseAPAAUInsurance: re.socialsecurityexpenseAPAAUInsurance,
                    socialsecurityexpenseTPUInsurance: re.socialsecurityexpenseTPUInsurance,
                    socialsecurityexpenseTCUInsurance: re.socialsecurityexpenseTCUInsurance,
                    socialsecurityexpenseATAUIPayment: re.socialsecurityexpenseATAUIPayment,
                    socialsecurityexpenseHAFPBase: re.socialsecurityexpenseHAFPBase,
                    socialsecurityexpenseHRBAdjustment: re.socialsecurityexpenseHRBAdjustment,
                    socialsecurityexpensePPHUnits: re.socialsecurityexpensePPHUnits,
                    socialsecurityexpenseHAFPAmount: re.socialsecurityexpenseHAFPAmount,
                    socialsecurityexpenseHAFAAUAmount: re.socialsecurityexpenseHAFAAUAmount,
                    socialsecurityexpensePHRPIndividuals: re.socialsecurityexpensePHRPIndividuals,
                    socialsecurityexpenseAPIHReserves: re.socialsecurityexpenseAPIHReserves,
                    socialsecurityexpenseHRATAmount: re.socialsecurityexpenseHRATAmount,
                    socialsecurityexpenseTPHReserves: re.socialsecurityexpenseTPHReserves,
                    socialsecurityexpenseHRTTAPayment: re.socialsecurityexpenseHRTTAPayment,
                    socialsecurityexpenseTAHRAATotal: re.socialsecurityexpenseTAHRAATotal,
                    socialsecurityexpenseManagementFPBase: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseAMFPUnit: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseTAMFPaid: re.socialsecurityexpenseManagementFPBase,
                    socialsecurityexpenseASSWage: re.socialsecurityexpenseASSWage,
                    socialsecurityexpensePFSalary: re.socialsecurityexpensePFSalary,
                    socialsecurityexpenseTAPUit: re.socialsecurityexpenseTAPUit,
                    socialsecurityexpenseTUALater: re.socialsecurityexpenseTUALater,
                    socialsecurityexpenseTAPIndividuals: re.socialsecurityexpenseTAPIndividuals,
                    socialsecurityexpenseTPAALater: re.socialsecurityexpenseTPAALater,
                    socialsecurityexpenseTAPTAPayment: re.socialsecurityexpenseTAPTAPayment,
                    socialsecurityexpenseTAPAAdjustment: re.socialsecurityexpenseTAPAAdjustment,
                    employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                    corporateInformationTradeName: re.corporateInformationTradeName,
                    employeeregistrationformFileNumber: re.employeeregistrationformFileNumber,
                    employeeregistrationformName: re.employeeregistrationformName
                }])
                .execute();


    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  autoaddso ---------", e);
        return {state: stat.defeated};
    }
}
//自动生成下个月的社保费用补差
export async function autoaddsofee(re,socialsecurityexpenseDate){
    try {
            const addsfee = await CONNECTION
                .createQueryBuilder()
                .insert()
                .into(socialsecurityfee)
                .values([{
                    employeeregistrationformFileNumber: re.employeeregistrationformFileNumber,
                    employeeregistrationformName: re.employeeregistrationformName,
                    makeupPersonalOldage: re.makeupPersonalOldage,
                    makeupPersonalMedical: re.makeupPersonalMedical,
                    makeupPersonalSeriousIllness: re.makeupPersonalSeriousIllness,
                    makeupPersonalUnemployment: re.makeupPersonalUnemployment,
                    makeupPersonalProvidentfund: re.makeupPersonalProvidentfund,
                    makeupPersonalSubtotal: re.makeupPersonalSubtotal,
                    makeupUnitOldage: re.makeupUnitOldage,
                    makeupUnitMedical: re.makeupUnitMedical,
                    makeupUnitSeriousIllness: re.makeupUnitSeriousIllness,
                    makeupUnitGivebBirth: re.makeupUnitGivebBirth,
                    makeupUnitUnemployment: re.makeupUnitUnemployment,
                    makeupUnitWorkInjury: re.makeupUnitWorkInjury,
                    makeupUnitProvidentfund: re.makeupUnitProvidentfund,
                    makeupUnitSubtotal: re.makeupUnitSubtotal,
                    differencestatement: re.differencestatement,
                    corporateInformationTradeName: re.corporateInformationTradeName,
                    employeeregistrationformIDNumber: re.employeeregistrationformIDNumber,
                    socialsecurityexpenseDate: socialsecurityexpenseDate
                }])
                .execute();
    } catch (e) {
        Logger.error("----service  / socialsecuritycost  /  autoaddsofee ---------", e);
        return {state: stat.defeated};
    }

}
