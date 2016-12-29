export default ($scope, $rootScope, qService, populationRes) => {
	'ngInject';
    (function() {
        document.body.scrollIntoView();
    })();
    const sumArr = (arr1,arr2) => {
    	let sum = 0;
    	let arr = [];
    	for (var i = arr1.length - 1; i >= 0; i--) {
    		sum += arr1[i];
    	}
    	for (var i = arr2.length - 1; i >= 0; i--) {
    		sum += arr2[i];
    	}
    	for (var i = arr1.length - 1; i >= 0; i--) {
    		arr[i] = (arr1[i] / sum*100).toFixed(2);
    	}
    	return arr;
    }
    $scope.data = null;
    var popData;
    $rootScope.loading = true;
    var promise = qService.httpGetWithToken(populationRes.getPopulationStructurePreData, {}, {});
    promise.then(function(rc){
    	popData = rc.data;
    	//2015年的数据
        var popData13 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var popData14 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale6 = 0; //初始化男性总数
        var sumFemale6 = 0; //初始化女性总数
        var curMale = [];
        var curMale1 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2015) {
                if (popData[i].sexType_id === 1) { //当前男性
                    curMale.push(-popData[i].preResidentPopulation);
                    //2015年男性总人数
                    sumMale6 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        //2015年0-5岁男性总人数
                        popData13[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        //2015年6-11岁男性总人数
                        popData13[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        //2015年12-17岁男性总人数
                        popData13[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        //2015年18-23岁男性总人数
                        popData13[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        //2015年24-29岁男性总人数
                        popData13[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        //2015年30-35岁男性总人数
                        popData13[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        //2015年36-41岁男性总人数
                        popData13[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        //2015年42-47岁男性总人数
                        popData13[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        //2015年48-53岁男性总人数
                        popData13[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        //2015年54-59岁男性总人数
                        popData13[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        //2015年60岁以上男性总人数
                        popData13[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    curMale1.push(popData[i].preResidentPopulation);
                    sumFemale6 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData14[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData14[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData14[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData14[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData14[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData14[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData14[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData14[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData14[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData14[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData14[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM15= sumArr(popData13,popData14);//2015年男性的比例
        var rateF15 = sumArr(popData14,popData13);//2015年女性的比例

        //2020年的数据
        var popData1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale = 0; //初始化男性总数
        var sumFemale = 0; //初始化女性总数
        var male20 = [];
        var female20 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2020) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male20.push(-popData[i].preResidentPopulation);
                    sumMale += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData1[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData1[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData1[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData1[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData1[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData1[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData1[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData1[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData1[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData1[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData1[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female20.push(popData[i].preResidentPopulation);
                    sumFemale += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData2[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData2[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData2[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData2[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData2[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData2[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData2[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData2[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData2[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData2[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData2[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM20= sumArr(popData1,popData2);
        var rateF20 = sumArr(popData2,popData1);
        //2025年的数据
        var popData3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale1 = 0; //初始化男性总数
        var sumFemale1 = 0; //初始化女性总数
        var male25 = [];
        var female25 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2025) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male25.push(-popData[i].preResidentPopulation);
                    sumMale1 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData3[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData3[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData3[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData3[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData3[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData3[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData3[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData3[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData3[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData3[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData3[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female25.push(popData[i].preResidentPopulation);
                    sumFemale1 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData4[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData4[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData4[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData4[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData4[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData4[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData4[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData4[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData4[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData4[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData4[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM25= sumArr(popData3,popData4);//2025年男性的比例
        var rateF25 = sumArr(popData4,popData3);//2025年女性的比例

        //2030年的数据
        var popData5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale2 = 0; //初始化男性总数
        var sumFemale2 = 0; //初始化女性总数
        var male30 = [];
        var female30 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2030) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male30.push(-popData[i].preResidentPopulation);
                    sumMale2 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData5[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData5[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData5[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData5[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData5[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData5[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData5[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData5[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData5[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData5[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData5[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female30.push(popData[i].preResidentPopulation);
                    sumFemale2 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData6[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData6[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData6[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData6[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData6[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData6[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData6[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData6[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData6[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData6[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData6[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM30= sumArr(popData5,popData6);//2030年男性的比例
        var rateF30 = sumArr(popData6,popData5);//2030年女性的比例

        //2035年的数据
        var popData7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale3 = 0; //初始化男性总数
        var sumFemale3 = 0; //初始化女性总数
        var male35 = [];
        var female35 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2035) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male35.push(-popData[i].preResidentPopulation);
                    sumMale3 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData7[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData7[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData7[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData7[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData7[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData7[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData7[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData7[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData7[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData7[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData7[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female35.push(popData[i].preResidentPopulation);
                    sumFemale3 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData8[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData8[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData8[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData8[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData8[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData8[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData8[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData8[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData8[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData8[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData8[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM35= sumArr(popData7,popData8);//2035年男性的比例
        var rateF35 = sumArr(popData8,popData7);//2035年女性的比例
        //2040年的数据
        var popData9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale4 = 0; //初始化男性总数
        var sumFemale4 = 0; //初始化女性总数
        var male40 = [];
        var female40 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2040) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male40.push(-popData[i].preResidentPopulation);
                    sumMale4 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData9[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData9[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData9[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData9[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData9[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData9[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData9[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData9[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData9[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData9[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData9[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female40.push(popData[i].preResidentPopulation);
                    sumFemale4 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData10[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData10[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData10[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData10[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData10[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData10[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData10[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData10[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData10[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData10[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData10[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM40= sumArr(popData9,popData10);//2040年男性的比例
        var rateF40 = sumArr(popData10,popData9);//2040年女性的比例
        //2045年的数据
        var popData11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测男性数据
        var popData12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //初始化预测女性数据
        var sumMale5 = 0; //初始化男性总数
        var sumFemale5 = 0; //初始化女性总数
        var male45 = [];
        var female45 = [];
        for (var i = 0; i < popData.length; i++) {
            if (popData[i].preYear === 2045) {
                if (popData[i].sexType_id === 1) { //预测男性
                    male45.push(-popData[i].preResidentPopulation);
                    sumMale5 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData11[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData11[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData11[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData11[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData11[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData11[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData11[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData11[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData11[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData11[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData11[10] += popData[i].preResidentPopulation;
                    }
                }
                if (popData[i].sexType_id === 2) { //预测女性
                    female45.push(popData[i].preResidentPopulation);
                    sumFemale5 += popData[i].preResidentPopulation;
                    if (popData[i].ageType_id < 6 && popData[i].ageType_id >= 0) {
                        popData12[0] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 12 && popData[i].ageType_id >= 6) {
                        popData12[1] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 18 && popData[i].ageType_id >= 12) {
                        popData12[2] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 24 && popData[i].ageType_id >= 18) {
                        popData12[3] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 30 && popData[i].ageType_id >= 24) {
                        popData12[4] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 36 && popData[i].ageType_id >= 30) {
                        popData12[5] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 42 && popData[i].ageType_id >= 36) {
                        popData12[6] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 48 && popData[i].ageType_id >= 42) {
                        popData12[7] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 54 && popData[i].ageType_id >= 48) {
                        popData12[8] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id < 60 && popData[i].ageType_id >= 54) {
                        popData12[9] += popData[i].preResidentPopulation;
                    }
                    if (popData[i].ageType_id >= 60) {
                        popData12[10] += popData[i].preResidentPopulation;
                    }
                }
            }
        }
        var rateM45= sumArr(popData11,popData12);//2045年男性的比例
        var rateF45 = sumArr(popData12,popData11);//2045年女性的比例
        //2015年
        $scope.years = ["0-5岁", "6-11岁", "12-17岁", "18-23岁", "24-29岁", "30-35岁", "36-41岁", "42-47岁", "48-53岁", "54-59岁", "60岁以上"];
        // $scope.years = ["年龄", "0-5岁", "6-11岁", "12-17岁", "18-23岁", "24-29岁", "30-35岁", "36-41岁", "42-47岁", "48-53岁", "54-59岁", "60岁以上"];
        $scope.male15 = ["男性", rateM15[0] + "%", rateM15[1] + "%", rateM15[2] + "%", rateM15[3] + "%", rateM15[4] + "%", rateM15[5] + "%", rateM15[6] + "%", rateM15[7] + "%", rateM15[8] + "%", rateM15[9] + "%", rateM15[10] + "%"];
        $scope.female15 = ["女性", rateF15[0] + "%", rateF15[1] + "%", rateF15[2] + "%", rateF15[3] + "%", rateF15[4] + "%", rateF15[5] + "%", rateF15[6] + "%", rateF15[7] + "%", rateF15[8] + "%", rateF15[9] + "%", rateF15[10] + "%"];

        //2020
        // $scope.years = ["年龄", "0-5岁", "6-11岁", "12-17岁", "18-23岁", "24-29岁", "30-35岁", "36-41岁", "42-47岁", "48-53岁", "54-59岁", "60岁以上"];
        $scope.years = ["0-5岁", "6-11岁", "12-17岁", "18-23岁", "24-29岁", "30-35岁", "36-41岁", "42-47岁", "48-53岁", "54-59岁", "60岁以上"];
        $scope.male20 = [rateM20[0] + "%", rateM20[1] + "%", rateM20[2] + "%", rateM20[3] + "%", rateM20[4] + "%", rateM20[5] + "%", rateM20[6] + "%", rateM20[7] + "%", rateM20[8] + "%", rateM20[9] + "%", rateM20[10] + "%"];
        $scope.female20 = [rateF20[0] + "%", rateF20[1] + "%", rateF20[2] + "%", rateF20[3] + "%", rateF20[4] + "%", rateF20[5] + "%", rateF20[6] + "%", rateF20[7] + "%", rateF20[8] + "%", rateF20[9] + "%", rateF20[10] + "%"];

        var columnColors = new Array('#7CB5EC', '#009FCC ', '#C1CDCD ', '#888888');
        var pieColors = new Array('#009FCC ', '#7CB5EC'); //'#0787C8', '#1FC22B'
        var pieColors1 = new Array('#44444 ', '#888888');
        
        $scope.buttonMap = [{
            name: 2020,
            label: 2020 + "",

        }, {
            name: 2025,
            label: 2025 + "",

        }, {
            name: 2030,
            label: 2030 + "",

        }, {
            name: 2035,
            label: 2035 + "",

        }, {
            name: 2040,
            label: 2040 + "",

        }, {
            name: 2045,
            label: 2045 + "",

        }];
        $scope.pyear = "2020";
        $scope.btn_click = function(btn) {
            $scope.change(btn);
        };
        //默认为2020年的表格
        $scope.manpre = rateM20;
        $scope.womanpre = rateF20;

        $scope.change = function(btn) {
            $rootScope.loading = true;
            //  var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');

            if (btn.name === 2020) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 增加到2020的32.08%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构呈现不断老龄化趋势。';
                // document.getElementById('populationPreYear').innerHTML = '2020';
                // document.getElementById('populationPreYear1').innerHTML = '2020';
                // document.getElementById('oldManProportion').innerHTML = '32.08';
                // document.getElementById('sexRatio').innerHTML = '105.11：100';
                $scope.pyear = "2020";

                //20年的男性人口给


                $scope.age_ration.options.colors = columnColors;
                $scope.age_ration.options.title.text = "太仓市2015/2020年人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    //  popData13代表的是2015年男性的数量
                    name: '2015年女性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2020年男性人口',
                    data: popData1,
                    stack: 'female'
                }, {
                    name: '2020年女性人口',
                    data: popData2,
                    stack: 'female'
                }];
                $scope.population_prediction_year.options.title.text = "太仓市2020年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male20
                }, {
                    name: '女性',
                    data: female20
                }]

                // $scope.manpre = $scope.age_ration.series[2].data;
                // $scope.womanpre = $scope.age_ration.series[3].data;
                $scope.manpre = rateM20;
                $scope.womanpre = rateF20;

            }
            if (btn.name === 2025) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 增加到2025的33.66%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构呈现不断老龄化趋势。';
                // document.getElementById('populationPreYear').innerHTML = '2025';
                // document.getElementById('populationPreYear1').innerHTML = '2025';
                // document.getElementById('oldManProportion').innerHTML = '33.66';
                // document.getElementById('sexRatio').innerHTML = '104.82：100';
                $scope.age_ration.options.colors = columnColors;
                $scope.pyear = "2025";
                $scope.age_ration.options.title.text = "太仓市2015/2025人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2015年女性人口',
                    data: popData14,
                    stack: 'male'
                }, {
                    name: '2025年男性人口',
                    data: popData3,
                    stack: 'female'
                }, {
                    name: '2025年女性人口',
                    data: popData4,
                    stack: 'female'
                }];

                $scope.population_prediction_year.options.title.text = "太仓市2025年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male25
                }, {
                    name: '女性',
                    data: female25
                }]
                $scope.manpre = rateM25;
                $scope.womanpre = rateF25;
            }
            if (btn.name === 2030) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 增加到2030的33.67%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构呈现不断老龄化趋势。';
                // document.getElementById('populationPreYear').innerHTML = '2030';
                // document.getElementById('populationPreYear1').innerHTML = '2030';
                // document.getElementById('oldManProportion').innerHTML = '33.67';
                $scope.pyear = "2030";
                // document.getElementById('sexRatio').innerHTML = '104.75：100';
                $scope.age_ration.options.colors = columnColors;
                $scope.age_ration.options.title.text = "太仓市2015/2030人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2015年女性人口',
                    data: popData14,
                    stack: 'male'
                }, {
                    name: '2030年男性人口',
                    data: popData5,
                    stack: 'female'
                }, {
                    name: '2030年女性人口',
                    data: popData6,
                    stack: 'female'
                }];
                $scope.population_prediction_year.options.title.text = "太仓市2030年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male30
                }, {
                    name: '女性',
                    data: female30
                }]
                $scope.manpre = rateM30;
                $scope.womanpre = rateF30;
            }
            if (btn.name === 2040) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 增加到2040的32.05%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构呈现不断老龄化趋势。';
                // document.getElementById('populationPreYear').innerHTML = '2040';
                // document.getElementById('populationPreYear1').innerHTML = '2040';
                // document.getElementById('oldManProportion').innerHTML = '32.05';
                $scope.pyear = "2040";
                // document.getElementById('sexRatio').innerHTML = '104.68：100';
                $scope.age_ration.options.colors = columnColors;
                $scope.age_ration.options.title.text = "太仓市2015/2040人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2015年女性人口',
                    data: popData14,
                    stack: 'male'
                }, {
                    name: '2040年男性人口',
                    data: popData9,
                    stack: 'female'
                }, {
                    name: '2040年女性人口',
                    data: popData10,
                    stack: 'female'
                }];
                $scope.manpre = rateM40;
                $scope.womanpre = rateF40;
                $scope.population_prediction_year.options.title.text = "太仓市2040年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male40
                }, {
                    name: '女性',
                    data: female40
                }]
                $scope.manpre = $scope.age_ration.series[2].data;
                $scope.womanpre = $scope.age_ration.series[3].data;
            }
            if (btn.name === 2035) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 增加到2035的33.92%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构呈现不断老龄化趋势。';
                // document.getElementById('populationPreYear').innerHTML = '2035';
                $scope.pyear = "2035";
                // document.getElementById('populationPreYear1').innerHTML = '2035';
                // document.getElementById('sexRatio').innerHTML = '104.56：100';
                // document.getElementById('oldManProportion').innerHTML = '33.92';
                $scope.age_ration.options.colors = columnColors;
                $scope.age_ration.options.title.text = "太仓市2015/2035人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2015年女性人口',
                    data: popData14,
                    stack: 'male'
                }, {
                    name: '2035年男性人口',
                    data: popData7,
                    stack: 'female'
                }, {
                    name: '2035年女性人口',
                    data: popData8,
                    stack: 'female'
                }];
                $scope.manpre = rateM35;
                $scope.womanpre = rateF35;
                $scope.population_prediction_year.options.title.text = "太仓市2035年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male35
                }, {
                    name: '女性',
                    data: female35
                }]
                // $scope.manpre = $scope.age_ration.series[2].data;
                // $scope.womanpre = $scope.age_ration.series[3].data;
            }
            if (btn.name === 2045) {
                document.getElementById('abc').innerHTML = '数据分析：60岁及以上人口比例从2015的31.02% 减少到2045的30.51%。';
                document.getElementById('conclusion').innerHTML = '结论：太仓市人口结构老龄化趋势有所放缓。';
                // document.getElementById('populationPreYear').innerHTML = '2045';
                // document.getElementById('populationPreYear1').innerHTML = '2045';
                // document.getElementById('oldManProportion').innerHTML = '30.51';
                // document.getElementById('sexRatio').innerHTML = '103.31：100';
                $scope.pyear = "2045";
                $scope.age_ration.options.colors = columnColors;
                $scope.age_ration.options.title.text = "太仓市2015/2045人口结构图";
                $scope.age_ration.series = [{
                    name: '2015年男性人口',
                    data: popData13,
                    stack: 'male'
                }, {
                    name: '2015年女性人口',
                    data: popData14,
                    stack: 'male'
                }, {
                    name: '2045年男性人口',
                    data: popData11,
                    stack: 'female'
                }, {
                    name: '2045女性人口',
                    data: popData12,
                    stack: 'female'
                }];
                $scope.manpre = rateM45;
                $scope.womanpre = rateF45;
                $scope.population_prediction_year.options.title.text = "太仓市2045年人口结构预测图";
                $scope.population_prediction_year.series = [{
                    name: '男性',
                    data: male45
                }, {
                    name: '女性',
                    data: female45
                }]
            }
            $rootScope.loading = false;
        };

        $scope.age_ration = {
            options: {
                colors: columnColors,
                chart: {
                    type: 'column',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                exporting: {
                    enabled: false, // 取消打印menu
                },
                title: {
                    text: '太仓市2015/2020人口结构图',
                    style: {
                        fontSize: "15px",
                    }
                },
                credits: {
                    enabled: false
                },
                legend: {
                    itemDistance: 30,
                    itemStyle: {
                        fontWeight: 'normal'
                    }
                },
                xAxis: {
                    categories: ['0-5岁', '6-11岁', '12-17岁', '18-23岁', '24-29岁', '30-35岁', '36-41岁', '42-47岁', '48-53岁', '54-59岁', '60岁以上'],
                    labels: {
                        rotation: -45,
                        align: 'right',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },

                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: '人口数量(人)'
                    }
                },

                tooltip: {
                    formatter: function() {
                        return ' <b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            '总共: ' + this.point.stackTotal;
                    }
                },

                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                }
            },

            series: [{
                name: '2015年男性人口',
                data: popData13,
                stack: 'male'
            }, {
                name: '2015年女性人口',
                data: popData14,
                stack: 'male'
            }, {
                name: '2020年男性人口',
                data: popData1,
                stack: 'female'
            }, {
                name: '2020年女性人口',
                data: popData2,
                stack: 'female'
            }]

        };
        var categories = ['0岁', '1岁', '2岁', '3岁',
            '4岁', '5岁', '6岁', '7岁', '8岁',
            '9岁', '10岁', '11岁', '12岁', '13岁',
            '14岁', '15岁', '16岁', '17岁', '18岁',
            '19岁', '20岁', '21岁', '22岁', '23岁',
            '24岁', '25岁', '26岁', '27岁', '28岁',
            '29岁', '30岁', '31岁', '32岁', '33岁',
            '34岁', '35岁', '36岁', '37岁', '38岁',
            '39岁', '40岁', '41岁', '42岁', '43岁',
            '44岁', '45岁', '46岁', '47岁', '48岁',
            '49岁', '50岁', '51岁', '52岁', '53岁',
            '54岁', '55岁', '56岁', '57岁', '58岁',
            '59岁', '60岁', '61岁', '62岁', '63岁',
            '64岁', '65岁', '66岁', '67岁', '68岁',
            '69岁', '70岁', '71岁', '72岁', '73岁',
            '74岁', '75岁', '76岁', '77岁', '78岁',
            '79岁', '80岁', '81岁', '82岁', '83岁',
            '84岁', '85岁', '86岁', '87岁', '88岁',
            '89岁', '90岁', '91岁', '92岁', '93岁',
            '94岁', '95岁', '96岁', '97岁', '98岁',
            '99岁', '100岁+'
        ];
        $scope.population_year = {
            options: {
                colors: pieColors,
                chart: {
                    type: 'bar'
                },
                exporting: {
                    enabled: false, // 取消打印menu
                },
                title: {
                    text: '太仓市2015年人口结构图',
                    style: {
                        fontSize: "15px",
                    }
                },
                legend: {

                    itemStyle: {
                        fontWeight: 'normal'
                    }
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 10
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 10
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function() {
                            return (Math.abs(this.value) / 1000) + 'K';
                        }
                    },
                    min: -6000,
                    max: 6000
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    formatter: function() {
                        return ' <b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            '人口: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                }
            },

            series: [{
                name: '男性',
                data: curMale
            }, {
                name: '女性',
                data: curMale1
            }]
        };
        $scope.population_prediction_year = {
            options: {
                colors: pieColors1,
                chart: {
                    type: 'bar',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                exporting: {
                    enabled: false, // 取消打印menu
                },
                title: {
                    text: '太仓市2020年人口结构预测图',
                    style: {
                        fontSize: "15px",
                    }
                },
                legend: {

                    itemStyle: {
                        fontWeight: 'normal'
                    }
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 10
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 10
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function() {
                            return (Math.abs(this.value) / 1000) + 'K';
                        }
                    },
                    min: -6000,
                    max: 6000
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function() {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            '人口: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                }
            },

            series: [{
                name: '男性',
                data: male20
            }, {
                name: '女性',
                data: female20
            }]
        };
    }).finally(function() {
        $rootScope.loading = false;
    });
};