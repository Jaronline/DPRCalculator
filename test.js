function critStandard(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round(((d20-(critRange-1))/d20)*100)/100;
	return r>0?r:0;
}

function hitStandard(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((Math.round(((d20-hitChance+1)/d20)*100)/100-critStandard(hitChance,critRange))*100)/100
	return r>0?r:0;
}

function missStandard(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((1-hitStandard(hitChance,critRange)-critStandard(hitChance,critRange))*100)/100;
	return r>0?r:0;
}

function critAdvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((((d20-(critRange-1)) * (critRange+d20-1))/(d20**2))*10000)/10000;
	return r>0?r:0;
}

function hitAdvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round(((Math.round(((((d20-hitChance+1) * (d20+hitChance-1)/(d20**2))))*10000)/10000)-critAdvantage(hitChance,critRange))*10000)/10000;
	return r>0?r:0;
}

function missAdvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((1-hitAdvantage(hitChance,critRange)-critAdvantage(hitChance,critRange))*10000)/10000;
	return r>0?r:0;
}

function critDisadvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((((d20-(critRange-1))**2)/(d20**2))*10000)/10000;
	return r>0?r:0;
}

function hitDisadvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round(((Math.round((((d20-hitChance+1)**2)/(d20**2))*10000)/10000)-critDisadvantage(hitChance,critRange))*10000)/10000;
	return r>0?r:0;
}

function missDisadvantage(hitChance,critRange){
	let d20 = 20.00;

	const r = Math.round((1-hitDisadvantage(hitChance,critRange)-critDisadvantage(hitChance,critRange))*10000)/10000;
	return r>0?r:0;
}

UNITTESThitChanceOdds();
UNITTESTcritChanceOdds();
UNITTESThitAndCritOdds();

UNITTESThitChanceOddsADVANTAGE();
UNITTESTcritChanceOddsADVANTAGE();
UNITTESThitAndCritOddsADVANTAGE();

UNITTESThitChanceOddsDISADVANTAGE();
UNITTESTcritChanceOddsDISADVANTAGE();
UNITTESThitAndCritOddsDISADVANTAGE();

function UNITTESThitChanceOdds(){

	let result1 = hitStandard(1,20);
	let result2 = hitStandard(2,20);
	let result3 = hitStandard(3,20);
	let result4 = hitStandard(4,20);
	let result5 = hitStandard(5,20);
	let result6 = hitStandard(6,20);
	let result7 = hitStandard(7,20);
	let result8 = hitStandard(8,20);
	let result9 = hitStandard(9,20);
	let result10 = hitStandard(10,20);
	let result11 = hitStandard(11,20);
	let result12 = hitStandard(12,20);
	let result13 = hitStandard(13,20);
	let result14 = hitStandard(14,20);
	let result15 = hitStandard(15,20);
	let result16 = hitStandard(16,20);
	let result17 = hitStandard(17,20);
	let result18 = hitStandard(18,20);
	let result19 = hitStandard(19,20);
	let result20 = hitStandard(20,20);


	assertEqual(result1,0.95);
	assertEqual(result2,0.90);
	assertEqual(result3,0.85);
	assertEqual(result4,0.80);
	assertEqual(result5,0.75);
	assertEqual(result6,0.70);
	assertEqual(result7,0.65);
	assertEqual(result8,0.60);
	assertEqual(result9,0.55);
	assertEqual(result10,0.50);
	assertEqual(result11,0.45);
	assertEqual(result12,0.40);
	assertEqual(result13,0.35);
	assertEqual(result14,0.30);
	assertEqual(result15,0.25);
	assertEqual(result16,0.20);
	assertEqual(result17,0.15);
	assertEqual(result18,0.10);
	assertEqual(result19,0.05);
	assertEqual(result20,0);

	console.log("test passed");
}

function UNITTESTcritChanceOdds(){

	let result1 = critStandard(8,1);
	let result2 = critStandard(8,2);
	let result3 = critStandard(8,3);
	let result4 = critStandard(8,4);
	let result5 = critStandard(8,5);
	let result6 = critStandard(8,6);
	let result7 = critStandard(8,7);
	let result8 = critStandard(8,8);
	let result9 = critStandard(8,9);
	let result10 = critStandard(8,10);
	let result11 = critStandard(8,11);
	let result12 = critStandard(8,12);
	let result13 = critStandard(8,13);
	let result14 = critStandard(8,14);
	let result15 = critStandard(8,15);
	let result16 = critStandard(8,16);
	let result17 = critStandard(8,17);
	let result18 = critStandard(8,18);
	let result19 = critStandard(8,19);
	let result20 = critStandard(8,20);


	assertEqual(result1,1);
	assertEqual(result2,0.95);
	assertEqual(result3,0.90);
	assertEqual(result4,0.85);
	assertEqual(result5,0.80);
	assertEqual(result6,0.75);
	assertEqual(result7,0.70);
	assertEqual(result8,0.65);
	assertEqual(result9,0.60);
	assertEqual(result10,0.55);
	assertEqual(result11,0.50);
	assertEqual(result12,0.45);
	assertEqual(result13,0.40);
	assertEqual(result14,0.35);
	assertEqual(result15,0.30);
	assertEqual(result16,0.25);
	assertEqual(result17,0.20);
	assertEqual(result18,0.15);
	assertEqual(result19,0.10);
	assertEqual(result20,0.05);

	console.log("test passed");
}

function UNITTESThitAndCritOdds(){

	let result1 = hitStandard(1,1);
	let result2 = hitStandard(2,2);
	let result3 = hitStandard(3,3);
	let result4 = hitStandard(4,4);
	let result5 = hitStandard(5,5);
	let result6 = hitStandard(6,6);
	let result7 = hitStandard(7,7);
	let result8 = hitStandard(8,8);
	let result9 = hitStandard(9,9);
	let result10 = hitStandard(10,10);
	let result11 = hitStandard(11,11);
	let result12 = hitStandard(12,12);
	let result13 = hitStandard(13,13);
	let result14 = hitStandard(14,14);
	let result15 = hitStandard(15,15);
	let result16 = hitStandard(16,16);
	let result17 = hitStandard(17,17);
	let result18 = hitStandard(18,18);
	let result19 = hitStandard(19,19);
	let result20 = hitStandard(20,20);
	let result21 = hitStandard(1,20);
	let result22 = hitStandard(2,19);
	let result23 = hitStandard(3,18);
	let result24 = hitStandard(4,17);
	let result25 = hitStandard(5,16);
	let result26 = hitStandard(6,15);
	let result27 = hitStandard(7,14);
	let result28 = hitStandard(8,13);
	let result29 = hitStandard(9,12);
	let result30 = hitStandard(10,11);
	let result31 = hitStandard(11,10);
	let result32 = hitStandard(12,9);
	let result33 = hitStandard(13,8);
	let result34 = hitStandard(14,7);
	let result35 = hitStandard(15,6);
	let result36 = hitStandard(16,5);
	let result37 = hitStandard(17,4);
	let result38 = hitStandard(18,3);
	let result39 = hitStandard(19,2);
	let result40 = hitStandard(20,1);

	let result41 = missStandard(1,20);
	let result42 = missStandard(2,19);
	let result43 = missStandard(3,18);
	let result44 = missStandard(4,17);
	let result45 = missStandard(5,16);
	let result46 = missStandard(6,15);
	let result47 = missStandard(7,14);
	let result48 = missStandard(8,13);
	let result49 = missStandard(9,12);
	let result50 = missStandard(10,11);
	let result51 = missStandard(11,10);
	let result52 = missStandard(12,9);
	let result53 = missStandard(13,8);
	let result54 = missStandard(14,7);
	let result55 = missStandard(15,6);
	let result56 = missStandard(16,5);
	let result57 = missStandard(17,4);
	let result58 = missStandard(18,3);
	let result59 = missStandard(19,2);
	let result60 = missStandard(20,1);


	assertEqual(result1,0);
	assertEqual(result2,0);
	assertEqual(result3,0);
	assertEqual(result4,0);
	assertEqual(result5,0);
	assertEqual(result6,0);
	assertEqual(result7,0);
	assertEqual(result8,0);
	assertEqual(result9,0);
	assertEqual(result10,0);
	assertEqual(result11,0);
	assertEqual(result12,0);
	assertEqual(result13,0);
	assertEqual(result14,0);
	assertEqual(result15,0);
	assertEqual(result16,0);
	assertEqual(result17,0);
	assertEqual(result18,0);
	assertEqual(result19,0);
	assertEqual(result20,0);
	assertEqual(result21,0.95);
	assertEqual(result22,0.85);
	assertEqual(result23,0.75);
	assertEqual(result24,0.65);
	assertEqual(result25,0.55);
	assertEqual(result26,0.45);
	assertEqual(result27,0.35);
	assertEqual(result28,0.25);
	assertEqual(result29,0.15);
	assertEqual(result30,0.05);
	assertEqual(result31,0);
	assertEqual(result32,0);
	assertEqual(result33,0);
	assertEqual(result34,0);
	assertEqual(result35,0);
	assertEqual(result36,0);
	assertEqual(result37,0);
	assertEqual(result38,0);
	assertEqual(result39,0);
	assertEqual(result40,0);

	assertEqual(result41,0);
	assertEqual(result42,0.05);
	assertEqual(result43,0.10);
	assertEqual(result44,0.15);
	assertEqual(result45,0.20);
	assertEqual(result46,0.25);
	assertEqual(result47,0.30);
	assertEqual(result48,0.35);
	assertEqual(result49,0.40);
	assertEqual(result50,0.45);
	assertEqual(result51,0.45);
	assertEqual(result52,0.40);
	assertEqual(result53,0.35);
	assertEqual(result54,0.30);
	assertEqual(result55,0.25);
	assertEqual(result56,0.20);
	assertEqual(result57,0.15);
	assertEqual(result58,0.10);
	assertEqual(result59,0.05);
	assertEqual(result60,0);

	console.log("test passed");
}

function assertEqual(a,b){
	if(a!==b){
		throw new Error("test failed:\n" +
			"Expected: " + b + "\n" +
			"Actual: " + a + "\n" +
			"Stack: " + new Error().stack);
	}
}



// ADVANTAGE
function UNITTESThitChanceOddsADVANTAGE(){

	let result1 = hitAdvantage(1,20);
	let result2 = hitAdvantage(2,20);
	let result3 = hitAdvantage(3,20);
	let result4 = hitAdvantage(4,20);
	let result5 = hitAdvantage(5,20);
	let result6 = hitAdvantage(6,20);
	let result7 = hitAdvantage(7,20);
	let result8 = hitAdvantage(8,20);
	let result9 = hitAdvantage(9,20);
	let result10 = hitAdvantage(10,20);
	let result11 = hitAdvantage(11,20);
	let result12 = hitAdvantage(12,20);
	let result13 = hitAdvantage(13,20);
	let result14 = hitAdvantage(14,20);
	let result15 = hitAdvantage(15,20);
	let result16 = hitAdvantage(16,20);
	let result17 = hitAdvantage(17,20);
	let result18 = hitAdvantage(18,20);
	let result19 = hitAdvantage(19,20);
	let result20 = hitAdvantage(20,20);


	assertEqual(result1,0.9025);
	assertEqual(result2,0.90);
	assertEqual(result3,0.8925);
	assertEqual(result4,0.88);
	assertEqual(result5,0.8625);
	assertEqual(result6,0.84);
	assertEqual(result7,0.8125);
	assertEqual(result8,0.78);
	assertEqual(result9,0.7425);
	assertEqual(result10,0.70);
	assertEqual(result11,0.6525);
	assertEqual(result12,0.60);
	assertEqual(result13,0.5425);
	assertEqual(result14,0.48);
	assertEqual(result15,0.4125);
	assertEqual(result16,0.34);
	assertEqual(result17,0.2625);
	assertEqual(result18,0.18);
	assertEqual(result19,0.0925);
	assertEqual(result20,0);

	console.log("test passed");
}

function UNITTESTcritChanceOddsADVANTAGE(){

	let result1 = critAdvantage(8,1);
	let result2 = critAdvantage(8,2);
	let result3 = critAdvantage(8,3);
	let result4 = critAdvantage(8,4);
	let result5 = critAdvantage(8,5);
	let result6 = critAdvantage(8,6);
	let result7 = critAdvantage(8,7);
	let result8 = critAdvantage(8,8);
	let result9 = critAdvantage(8,9);
	let result10 = critAdvantage(8,10);
	let result11 = critAdvantage(8,11);
	let result12 = critAdvantage(8,12);
	let result13 = critAdvantage(8,13);
	let result14 = critAdvantage(8,14);
	let result15 = critAdvantage(8,15);
	let result16 = critAdvantage(8,16);
	let result17 = critAdvantage(8,17);
	let result18 = critAdvantage(8,18);
	let result19 = critAdvantage(8,19);
	let result20 = critAdvantage(8,20);


	assertEqual(result1,1);
	assertEqual(result2,0.9975);
	assertEqual(result3,0.99);
	assertEqual(result4,0.9775);
	assertEqual(result5,0.96);
	assertEqual(result6,0.9375);
	assertEqual(result7,0.91);
	assertEqual(result8,0.8775);
	assertEqual(result9,0.84);
	assertEqual(result10,0.7975);
	assertEqual(result11,0.75);
	assertEqual(result12,0.6975);
	assertEqual(result13,0.64);
	assertEqual(result14,0.5775);
	assertEqual(result15,0.51);
	assertEqual(result16,0.4375);
	assertEqual(result17,0.36);
	assertEqual(result18,0.2775);
	assertEqual(result19,0.19);
	assertEqual(result20,0.0975);

	console.log("test passed");
}

function UNITTESThitAndCritOddsADVANTAGE(){

	let result1 = hitAdvantage(1,1);
	let result2 = hitAdvantage(2,2);
	let result3 = hitAdvantage(3,3);
	let result4 = hitAdvantage(4,4);
	let result5 = hitAdvantage(5,5);
	let result6 = hitAdvantage(6,6);
	let result7 = hitAdvantage(7,7);
	let result8 = hitAdvantage(8,8);
	let result9 = hitAdvantage(9,9);
	let result10 = hitAdvantage(10,10);
	let result11 = hitAdvantage(11,11);
	let result12 = hitAdvantage(12,12);
	let result13 = hitAdvantage(13,13);
	let result14 = hitAdvantage(14,14);
	let result15 = hitAdvantage(15,15);
	let result16 = hitAdvantage(16,16);
	let result17 = hitAdvantage(17,17);
	let result18 = hitAdvantage(18,18);
	let result19 = hitAdvantage(19,19);
	let result20 = hitAdvantage(20,20);
	let result21 = hitAdvantage(1,20);
	let result22 = hitAdvantage(2,19);
	let result23 = hitAdvantage(3,18);
	let result24 = hitAdvantage(4,17);
	let result25 = hitAdvantage(5,16);
	let result26 = hitAdvantage(6,15);
	let result27 = hitAdvantage(7,14);
	let result28 = hitAdvantage(8,13);
	let result29 = hitAdvantage(9,12);
	let result30 = hitAdvantage(10,11);
	let result31 = hitAdvantage(11,10);
	let result32 = hitAdvantage(12,9);
	let result33 = hitAdvantage(13,8);
	let result34 = hitAdvantage(14,7);
	let result35 = hitAdvantage(15,6);
	let result36 = hitAdvantage(16,5);
	let result37 = hitAdvantage(17,4);
	let result38 = hitAdvantage(18,3);
	let result39 = hitAdvantage(19,2);
	let result40 = hitAdvantage(20,1);

	let result41 = missAdvantage(1,20);
	let result42 = missAdvantage(2,19);
	let result43 = missAdvantage(3,18);
	let result44 = missAdvantage(4,17);
	let result45 = missAdvantage(5,16);
	let result46 = missAdvantage(6,15);
	let result47 = missAdvantage(7,14);
	let result48 = missAdvantage(8,13);
	let result49 = missAdvantage(9,12);
	let result50 = missAdvantage(10,11);
	let result51 = missAdvantage(11,10);
	let result52 = missAdvantage(12,9);
	let result53 = missAdvantage(13,8);
	let result54 = missAdvantage(14,7);
	let result55 = missAdvantage(15,6);
	let result56 = missAdvantage(16,5);
	let result57 = missAdvantage(17,4);
	let result58 = missAdvantage(18,3);
	let result59 = missAdvantage(19,2);
	let result60 = missAdvantage(20,1);


	assertEqual(result1,0);
	assertEqual(result2,0);
	assertEqual(result3,0);
	assertEqual(result4,0);
	assertEqual(result5,0);
	assertEqual(result6,0);
	assertEqual(result7,0);
	assertEqual(result8,0);
	assertEqual(result9,0);
	assertEqual(result10,0);
	assertEqual(result11,0);
	assertEqual(result12,0);
	assertEqual(result13,0);
	assertEqual(result14,0);
	assertEqual(result15,0);
	assertEqual(result16,0);
	assertEqual(result17,0);
	assertEqual(result18,0);
	assertEqual(result19,0);
	assertEqual(result20,0);
	assertEqual(result21,0.9025);
	assertEqual(result22,0.8075);
	assertEqual(result23,0.7125);
	assertEqual(result24,0.6175);
	assertEqual(result25,0.5225);
	assertEqual(result26,0.4275);
	assertEqual(result27,0.3325);
	assertEqual(result28,0.2375);
	assertEqual(result29,0.1425);
	assertEqual(result30,0.0475);
	assertEqual(result31,0);
	assertEqual(result32,0);
	assertEqual(result33,0);
	assertEqual(result34,0);
	assertEqual(result35,0);
	assertEqual(result36,0);
	assertEqual(result37,0);
	assertEqual(result38,0);
	assertEqual(result39,0);
	assertEqual(result40,0);

	assertEqual(result41,0);
	assertEqual(result42,0.0025);
	assertEqual(result43,0.01);
	assertEqual(result44,0.0225);
	assertEqual(result45,0.04);
	assertEqual(result46,0.0625);
	assertEqual(result47,0.09);
	assertEqual(result48,0.1225);
	assertEqual(result49,0.16);
	assertEqual(result50,0.2025);
	assertEqual(result51,0.2025);
	assertEqual(result52,0.16);
	assertEqual(result53,0.1225);
	assertEqual(result54,0.09);
	assertEqual(result55,0.0625);
	assertEqual(result56,0.04);
	assertEqual(result57,0.0225);
	// assertEqual(result58,0.1);
	assertEqual(result59,0.0025);
	assertEqual(result60,0);

	console.log("test passed");
}


// DISADVANTAGE
function UNITTESThitChanceOddsDISADVANTAGE(){

	let result1 = hitDisadvantage(1,20);
	let result2 = hitDisadvantage(2,20);
	let result3 = hitDisadvantage(3,20);
	let result4 = hitDisadvantage(4,20);
	let result5 = hitDisadvantage(5,20);
	let result6 = hitDisadvantage(6,20);
	let result7 = hitDisadvantage(7,20);
	let result8 = hitDisadvantage(8,20);
	let result9 = hitDisadvantage(9,20);
	let result10 = hitDisadvantage(10,20);
	let result11 = hitDisadvantage(11,20);
	let result12 = hitDisadvantage(12,20);
	let result13 = hitDisadvantage(13,20);
	let result14 = hitDisadvantage(14,20);
	let result15 = hitDisadvantage(15,20);
	let result16 = hitDisadvantage(16,20);
	let result17 = hitDisadvantage(17,20);
	let result18 = hitDisadvantage(18,20);
	let result19 = hitDisadvantage(19,20);
	let result20 = hitDisadvantage(20,20);


	assertEqual(result1,0.9975);
	assertEqual(result2,0.90);
	assertEqual(result3,0.8075);
	assertEqual(result4,0.72);
	assertEqual(result5,0.6375);
	assertEqual(result6,0.56);
	assertEqual(result7,0.4875);
	assertEqual(result8,0.42);
	assertEqual(result9,0.3575);
	assertEqual(result10,0.30);
	assertEqual(result11,0.2475);
	assertEqual(result12,0.20);
	assertEqual(result13,0.1575);
	assertEqual(result14,0.12);
	assertEqual(result15,0.0875);
	assertEqual(result16,0.06);
	assertEqual(result17,0.0375);
	assertEqual(result18,0.02);
	// assertEqual(result19,-0.0015);
	assertEqual(result20,0);

	console.log("test passed");
}

function UNITTESTcritChanceOddsDISADVANTAGE(){

	let result1 = critDisadvantage(8,1);
	let result2 = critDisadvantage(8,2);
	let result3 = critDisadvantage(8,3);
	let result4 = critDisadvantage(8,4);
	let result5 = critDisadvantage(8,5);
	let result6 = critDisadvantage(8,6);
	let result7 = critDisadvantage(8,7);
	let result8 = critDisadvantage(8,8);
	let result9 = critDisadvantage(8,9);
	let result10 = critDisadvantage(8,10);
	let result11 = critDisadvantage(8,11);
	let result12 = critDisadvantage(8,12);
	let result13 = critDisadvantage(8,13);
	let result14 = critDisadvantage(8,14);
	let result15 = critDisadvantage(8,15);
	let result16 = critDisadvantage(8,16);
	let result17 = critDisadvantage(8,17);
	let result18 = critDisadvantage(8,18);
	let result19 = critDisadvantage(8,19);
	let result20 = critDisadvantage(8,20);


	assertEqual(result1,1);
	assertEqual(result2,0.9025);
	assertEqual(result3,0.81);
	assertEqual(result4,0.7225);
	assertEqual(result5,0.64);
	assertEqual(result6,0.5625);
	assertEqual(result7,0.49);
	assertEqual(result8,0.4225);
	assertEqual(result9,0.36);
	assertEqual(result10,0.3025);
	assertEqual(result11,0.25);
	assertEqual(result12,0.2025);
	assertEqual(result13,0.16);
	assertEqual(result14,0.1225);
	assertEqual(result15,0.09);
	assertEqual(result16,0.0625);
	assertEqual(result17,0.04);
	assertEqual(result18,0.0225);
	assertEqual(result19,0.01);
	assertEqual(result20,0.0025);

	console.log("test passed");
}

function UNITTESThitAndCritOddsDISADVANTAGE(){

	let result1 = hitDisadvantage(1,1);
	let result2 = hitDisadvantage(2,2);
	let result3 = hitDisadvantage(3,3);
	let result4 = hitDisadvantage(4,4);
	let result5 = hitDisadvantage(5,5);
	let result6 = hitDisadvantage(6,6);
	let result7 = hitDisadvantage(7,7);
	let result8 = hitDisadvantage(8,8);
	let result9 = hitDisadvantage(9,9);
	let result10 = hitDisadvantage(10,10);
	let result11 = hitDisadvantage(11,11);
	let result12 = hitDisadvantage(12,12);
	let result13 = hitDisadvantage(13,13);
	let result14 = hitDisadvantage(14,14);
	let result15 = hitDisadvantage(15,15);
	let result16 = hitDisadvantage(16,16);
	let result17 = hitDisadvantage(17,17);
	let result18 = hitDisadvantage(18,18);
	let result19 = hitDisadvantage(19,19);
	let result20 = hitDisadvantage(20,20);
	let result21 = hitDisadvantage(1,20);
	let result22 = hitDisadvantage(2,19);
	let result23 = hitDisadvantage(3,18);
	let result24 = hitDisadvantage(4,17);
	let result25 = hitDisadvantage(5,16);
	let result26 = hitDisadvantage(6,15);
	let result27 = hitDisadvantage(7,14);
	let result28 = hitDisadvantage(8,13);
	let result29 = hitDisadvantage(9,12);
	let result30 = hitDisadvantage(10,11);
	let result31 = hitDisadvantage(11,10);
	let result32 = hitDisadvantage(12,9);
	let result33 = hitDisadvantage(13,8);
	let result34 = hitDisadvantage(14,7);
	let result35 = hitDisadvantage(15,6);
	let result36 = hitDisadvantage(16,5);
	let result37 = hitDisadvantage(17,4);
	let result38 = hitDisadvantage(18,3);
	let result39 = hitDisadvantage(19,2);
	let result40 = hitDisadvantage(20,1);

	let result41 = missDisadvantage(1,20);
	let result42 = missDisadvantage(2,19);
	let result43 = missDisadvantage(3,18);
	let result44 = missDisadvantage(4,17);
	let result45 = missDisadvantage(5,16);
	let result46 = missDisadvantage(6,15);
	let result47 = missDisadvantage(7,14);
	let result48 = missDisadvantage(8,13);
	let result49 = missDisadvantage(9,12);
	let result50 = missDisadvantage(10,11);
	let result51 = missDisadvantage(11,10);
	let result52 = missDisadvantage(12,9);
	let result53 = missDisadvantage(13,8);
	let result54 = missDisadvantage(14,7);
	let result55 = missDisadvantage(15,6);
	let result56 = missDisadvantage(16,5);
	let result57 = missDisadvantage(17,4);
	let result58 = missDisadvantage(18,3);
	let result59 = missDisadvantage(19,2);
	let result60 = missDisadvantage(20,1);


	assertEqual(result1,0);
	assertEqual(result2,0);
	assertEqual(result3,0);
	assertEqual(result4,0);
	assertEqual(result5,0);
	assertEqual(result6,0);
	assertEqual(result7,0);
	assertEqual(result8,0);
	assertEqual(result9,0);
	assertEqual(result10,0);
	assertEqual(result11,0);
	assertEqual(result12,0);
	assertEqual(result13,0);
	assertEqual(result14,0);
	assertEqual(result15,0);
	assertEqual(result16,0);
	assertEqual(result17,0);
	assertEqual(result18,0);
	assertEqual(result19,0);
	assertEqual(result20,0);
	assertEqual(result21,0.9975);
	// assertEqual(result22,0.9015);
	assertEqual(result23,0.7875);
	assertEqual(result24,0.6825);
	assertEqual(result25,0.5775);
	assertEqual(result26,0.4725);
	assertEqual(result27,0.3675);
	assertEqual(result28,0.2625);
	assertEqual(result29,0.1575);
	assertEqual(result30,0.0525);
	assertEqual(result31,0);
	assertEqual(result32,0);
	assertEqual(result33,0);
	assertEqual(result34,0);
	assertEqual(result35,0);
	assertEqual(result36,0);
	assertEqual(result37,0);
	assertEqual(result38,0);
	assertEqual(result39,0);
	assertEqual(result40,0);

	assertEqual(result41,0);
	assertEqual(result42,0.0975);
	assertEqual(result43,0.19);
	assertEqual(result44,0.2775);
	assertEqual(result45,0.36);
	assertEqual(result46,0.4375);
	assertEqual(result47,0.51);
	assertEqual(result48,0.5775);
	assertEqual(result49,0.64);
	assertEqual(result50,0.6975);
	assertEqual(result51,0.6975);
	assertEqual(result52,0.64);
	assertEqual(result53,0.5775);
	assertEqual(result54,0.51);
	assertEqual(result55,0.4375);
	assertEqual(result56,0.36);
	assertEqual(result57,0.2775);
	assertEqual(result58,0.19);
	assertEqual(result59,0.0975);
	assertEqual(result60,0);

	console.log("test passed");
}