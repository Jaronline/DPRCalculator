const d20 = 20.0

const P = (threshold, total = d20, dice = 1) =>
	((total - threshold + 1) / total) ** Math.max(dice, 1);
  
const pAny = (threshold, total = d20, dice = 1) =>
1 - ((threshold - 1) / total) ** Math.max(dice, 1);

const pReroll = (threshold, total = d20, rerollThreshold = 1, dice = 1) => {
const p = (total - threshold + 1) / total;
const r = rerollThreshold / total;
return 1 - (1 - (p * (1 - r) + p * r)) ** Math.max(dice, 1);
};

// Standard
const critStandard = (hit, crit) => P(crit);
const hitStandard = (hit, crit) => Math.max(0, P(hit) - P(crit));
const missStandard = (hit, crit) => Math.max(0,1 - hitStandard(hit, crit) - critStandard(hit, crit));

// Advantage (any die succeeds)
const critAdvantage = (hit, crit, dice = 2) => pAny(crit, d20, dice??2);
const hitAdvantage = (hit, crit, dice = 2) => Math.max(0, pAny(hit, d20, dice??2) - pAny(crit, d20, dice??2));
const missAdvantage = (hit, crit, dice = 2) => Math.max(0,1 - hitAdvantage(hit, crit, dice??2) - critAdvantage(hit, crit, dice??2));

// Disadvantage (all dice must succeed)
const critDisadvantage = (hit, crit, dice = 2) => P(crit, d20, dice??2);
const hitDisadvantage = (hit, crit, dice = 2) => Math.max(0, P(hit, d20, dice??2) - P(crit, d20, dice??2));
const missDisadvantage = (hit, crit, dice = 2) => Math.max(0,1 - hitDisadvantage(hit, crit, dice??2) - critDisadvantage(hit, crit, dice??2));

const critReroll = (hit, crit, reroll = 1) => pReroll(crit, d20, reroll??1);
const hitReroll = (hit, crit, reroll = 1) => Math.max(0, pReroll(hit, d20, reroll??1) - pReroll(crit, d20, reroll??1));
const missReroll = (hit, crit, reroll = 1) => Math.max(0,1 - hitReroll(hit, crit, reroll??1) - critReroll(hit, crit, reroll??1));

function round(a, b){
    if(b>=1){
        return Math.round(a * (10 ** b)) / (10 ** b);
    }
    else {
        return Math.round(a);
    }
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

	let result1 = round(hitStandard(1,20),2);
	let result2 = round(hitStandard(2,20),2);
	let result3 = round(hitStandard(3,20),2);
	let result4 = round(hitStandard(4,20),2);
	let result5 = round(hitStandard(5,20),2);
	let result6 = round(hitStandard(6,20),2);
	let result7 = round(hitStandard(7,20),2);
	let result8 = round(hitStandard(8,20),2);
	let result9 = round(hitStandard(9,20),2);
	let result10 = round(hitStandard(10,20),2);
	let result11 = round(hitStandard(11,20),2);
	let result12 = round(hitStandard(12,20),2);
	let result13 = round(hitStandard(13,20),2);
	let result14 = round(hitStandard(14,20),2);
	let result15 = round(hitStandard(15,20),2);
	let result16 = round(hitStandard(16,20),2);
	let result17 = round(hitStandard(17,20),2);
	let result18 = round(hitStandard(18,20),2);
	let result19 = round(hitStandard(19,20),2);
	let result20 = round(hitStandard(20,20),2);


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function UNITTESThitAndCritOdds(){

	let result1 = round(hitStandard(1,1),2);
	let result2 = round(hitStandard(1,1),2);
	let result3 = round(hitStandard(3,3),2);
	let result4 = round(hitStandard(4,4),2);
	let result5 = round(hitStandard(5,5),2);
	let result6 = round(hitStandard(6,6),2);
	let result7 = round(hitStandard(7,7),2);
	let result8 = round(hitStandard(8,8),2);
	let result9 = round(hitStandard(9,9),2);
	let result10 = round(hitStandard(10,10),2);
	let result11 = round(hitStandard(11,11),2);
	let result12 = round(hitStandard(12,12),2);
	let result13 = round(hitStandard(13,13),2);
	let result14 = round(hitStandard(14,14),2);
	let result15 = round(hitStandard(15,15),2);
	let result16 = round(hitStandard(16,16),2);
	let result17 = round(hitStandard(17,17),2);
	let result18 = round(hitStandard(18,18),2);
	let result19 = round(hitStandard(19,19),2);
	let result20 = round(hitStandard(20,20),2);
	let result21 = round(hitStandard(1,20) ,2);
	let result22 = round(hitStandard(2,19) ,2);
	let result23 = round(hitStandard(3,18) ,2);
	let result24 = round(hitStandard(4,17) ,2);
	let result25 = round(hitStandard(5,16) ,2);
	let result26 = round(hitStandard(6,15) ,2);
	let result27 = round(hitStandard(7,14) ,2);
	let result28 = round(hitStandard(8,13) ,2);
	let result29 = round(hitStandard(9,12) ,2);
	let result30 = round(hitStandard(10,11),2);
	let result31 = round(hitStandard(11,10),2);
	let result32 = round(hitStandard(12,9),2);
	let result33 = round(hitStandard(13,8),2);
	let result34 = round(hitStandard(14,7),2);
	let result35 = round(hitStandard(15,6),2);
	let result36 = round(hitStandard(16,5),2);
	let result37 = round(hitStandard(17,4),2);
	let result38 = round(hitStandard(18,3),2);
	let result39 = round(hitStandard(19,2),2);
	let result40 = round(hitStandard(20,1),2);

	let result41 = Math.round((missStandard(1,20))*100)/100;
	let result42 = Math.round((missStandard(2,19))*100)/100;
	let result43 = Math.round((missStandard(3,18))*100)/100;
	let result44 = Math.round((missStandard(4,17))*100)/100;
	let result45 = Math.round((missStandard(5,16) )*100)/100;
	let result46 = Math.round((missStandard(6,15) )*100)/100;
	let result47 = Math.round((missStandard(7,14) )*100)/100;
	let result48 = Math.round((missStandard(8,13))*100)/100;
	let result49 = Math.round((missStandard(9,12) )*100)/100;
	let result50 = Math.round((missStandard(10,11) )*100)/100;
	let result51 = Math.round((missStandard(11,10))*100)/100;
	let result52 = Math.round((missStandard(12,9) )*100)/100;
	let result53 = Math.round((missStandard(13,8) )*100)/100;
	let result54 = Math.round((missStandard(14,7))*100)/100;
	let result55 = Math.round((missStandard(15,6))*100)/100;
	let result56 = Math.round((missStandard(16,5))*100)/100;
	let result57 = Math.round((missStandard(17,4))*100)/100;
	let result58 = Math.round((missStandard(18,3) )*100)/100;
	let result59 = Math.round((missStandard(19,2) )*100)/100;
	let result60 = Math.round((missStandard(20,1))*100)/100;;


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function assertEqual(a,b,message=""){
	if(a!==b){
		throw new Error("\x1b[31m"+"test failed ("+message.toString()+"):\n" + "\x1b[0m" +
			"Expected: " + b + "\n" +
			"Actual: " + a + "\n" +
			"Stack: " + new Error().stack);
	}
}



// ADVANTAGE
function UNITTESThitChanceOddsADVANTAGE(){

	let result1 = Math.round((hitAdvantage(1,20))*10000)/10000;
	let result2 = Math.round((hitAdvantage(2,20))*10000)/10000;
	let result3 = Math.round((hitAdvantage(3,20))*10000)/10000;
	let result4 = Math.round((hitAdvantage(4,20))*10000)/10000;
	let result5 = Math.round((hitAdvantage(5,20))*10000)/10000;
	let result6 = Math.round((hitAdvantage(6,20))*10000)/10000;
	let result7 = Math.round((hitAdvantage(7,20))*10000)/10000;
	let result8 = Math.round((hitAdvantage(8,20))*10000)/10000;
	let result9 = Math.round((hitAdvantage(9,20) )*10000)/10000;
	let result10 = Math.round((hitAdvantage(10,20))*10000)/10000;
	let result11 = Math.round((hitAdvantage(11,20) )*10000)/10000;
	let result12 = Math.round((hitAdvantage(12,20) )*10000)/10000;
	let result13 = Math.round((hitAdvantage(13,20))*10000)/10000;
	let result14 = Math.round((hitAdvantage(14,20) )*10000)/10000;
	let result15 = Math.round((hitAdvantage(15,20) )*10000)/10000;
	let result16 = Math.round((hitAdvantage(16,20) )*10000)/10000;
	let result17 = Math.round((hitAdvantage(17,20))*10000)/10000;
	let result18 = Math.round((hitAdvantage(18,20))*10000)/10000;
	let result19 = Math.round((hitAdvantage(19,20) )*10000)/10000;
	let result20 = Math.round((hitAdvantage(20,20) )*10000)/10000;


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function UNITTESTcritChanceOddsADVANTAGE(){

	let result1 = round(critAdvantage(8,1),4);
	let result2 = round(critAdvantage(8,2),4);
	let result3 = round(critAdvantage(8,3),4);
	let result4 = round(critAdvantage(8,4),4);
	let result5 = round(critAdvantage(8,5),4);
	let result6 = round(critAdvantage(8,6),4);
	let result7 = round(critAdvantage(8,7),4);
	let result8 = round(critAdvantage(8,8),4);
	let result9 = round(critAdvantage(8,9),4);
	let result10 = round(critAdvantage(8,10),4);
	let result11 = round(critAdvantage(8,11),4);
	let result12 = round(critAdvantage(8,12),4);
	let result13 = round(critAdvantage(8,13),4);
	let result14 = round(critAdvantage(8,14),4);
	let result15 = round(critAdvantage(8,15),4);
	let result16 = round(critAdvantage(8,16),4);
	let result17 = round(critAdvantage(8,17),4);
	let result18 = round(critAdvantage(8,18),4);
	let result19 = round(critAdvantage(8,19),4);
	let result20 = round(critAdvantage(8,20),4);


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function UNITTESThitAndCritOddsADVANTAGE(){

	let result1 = round(hitAdvantage(1,1),4);
	let result2 = round(hitAdvantage(2,2),4);
	let result3 = round(hitAdvantage(3,3),4);
	let result4 = round(hitAdvantage(4,4),4);
	let result5 = round(hitAdvantage(5,5),4);
	let result6 = round(hitAdvantage(6,6),4);
	let result7 = round(hitAdvantage(7,7),4);
	let result8 = round(hitAdvantage(8,8),4);
	let result9 = round(hitAdvantage(9,9),4);
	let result10 = round(hitAdvantage(10,10),4);
	let result11 = round(hitAdvantage(11,11),4);
	let result12 = round(hitAdvantage(12,12),4);
	let result13 = round(hitAdvantage(13,13),4);
	let result14 = round(hitAdvantage(14,14),4);
	let result15 = round(hitAdvantage(15,15),4);
	let result16 = round(hitAdvantage(16,16),4);
	let result17 = round(hitAdvantage(17,17),4);
	let result18 = round(hitAdvantage(18,18),4);
	let result19 = round(hitAdvantage(19,19),4);
	let result20 = round(hitAdvantage(20,20),4);
	let result21 = round(hitAdvantage(1,20),4);
	let result22 = round(hitAdvantage(2,19),4);
	let result23 = round(hitAdvantage(3,18),4);
	let result24 = round(hitAdvantage(4,17),4);
	let result25 = round(hitAdvantage(5,16),4);
	let result26 = round(hitAdvantage(6,15),4);
	let result27 = round(hitAdvantage(7,14),4);
	let result28 = round(hitAdvantage(8,13),4);
	let result29 = round(hitAdvantage(9,12),4);
	let result30 = round(hitAdvantage(10,11),4);
	let result31 = round(hitAdvantage(11,10),4);
	let result32 = round(hitAdvantage(12,9),4);
	let result33 = round(hitAdvantage(13,8),4);
	let result34 = round(hitAdvantage(14,7),4);
	let result35 = round(hitAdvantage(15,6),4);
	let result36 = round(hitAdvantage(16,5),4);
	let result37 = round(hitAdvantage(17,4),4);
	let result38 = round(hitAdvantage(18,3),4);
	let result39 = round(hitAdvantage(19,2),4);
	let result40 = round(hitAdvantage(20,1),4);

	let result41 = round(missAdvantage(1,20),4);
	let result42 = round(missAdvantage(2,19),4);
	let result43 = round(missAdvantage(3,18),4);
	let result44 = round(missAdvantage(4,17),4);
	let result45 = round(missAdvantage(5,16),4);
	let result46 = round(missAdvantage(6,15),4);
	let result47 = round(missAdvantage(7,14),4);
	let result48 = round(missAdvantage(8,13),4);
	let result49 = round(missAdvantage(9,12),4);
	let result50 = round(missAdvantage(10,11),4);
	let result51 = round(missAdvantage(11,10),4);
	let result52 = round(missAdvantage(12,9),4);
	let result53 = round(missAdvantage(13,8),4);
	let result54 = round(missAdvantage(14,7),4);
	let result55 = round(missAdvantage(15,6),4);
	let result56 = round(missAdvantage(16,5),4);
	let result57 = round(missAdvantage(17,4),4);
	let result58 = round(missAdvantage(18,3),4);
	let result59 = round(missAdvantage(19,2),4);
	let result60 = round(missAdvantage(20,1),4);


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}


// DISADVANTAGE
function UNITTESThitChanceOddsDISADVANTAGE(){

	let result1 = Math.round((hitDisadvantage(1,20))*10000)/10000;
	let result2 = Math.round((hitDisadvantage(2,20))*10000)/10000;
	let result3 = Math.round((hitDisadvantage(3,20) )*10000)/10000;
	let result4 = Math.round((hitDisadvantage(4,20) )*10000)/10000;
	let result5 = Math.round((hitDisadvantage(5,20) )*10000)/10000;
	let result6 = Math.round((hitDisadvantage(6,20) )*10000)/10000;
	let result7 = Math.round((hitDisadvantage(7,20))*10000)/10000;
	let result8 = Math.round((hitDisadvantage(8,20) )*10000)/10000;
	let result9 = Math.round((hitDisadvantage(9,20))*10000)/10000;
	let result10 = Math.round((hitDisadvantage(10,20))*10000)/10000;
	let result11 = Math.round((hitDisadvantage(11,20))*10000)/10000;
	let result12 = Math.round((hitDisadvantage(12,20))*10000)/10000;
	let result13 = Math.round((hitDisadvantage(13,20))*10000)/10000;
	let result14 = Math.round((hitDisadvantage(14,20))*10000)/10000;
	let result15 = Math.round((hitDisadvantage(15,20))*10000)/10000;
	let result16 = Math.round((hitDisadvantage(16,20) )*10000)/10000;
	let result17 = Math.round((hitDisadvantage(17,20) )*10000)/10000;
	let result18 = Math.round((hitDisadvantage(18,20))*10000)/10000;
	let result19 = Math.round((hitDisadvantage(19,20))*10000)/10000;
	let result20 = Math.round((hitDisadvantage(20,20))*10000)/10000;


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function UNITTESTcritChanceOddsDISADVANTAGE(){

	let result1 = round(critDisadvantage(8,1),4);
	let result2 = round(critDisadvantage(8,2),4);
	let result3 = round(critDisadvantage(8,3),4);
	let result4 = round(critDisadvantage(8,4),4);
	let result5 = round(critDisadvantage(8,5),4);
	let result6 = round(critDisadvantage(8,6),4);
	let result7 = round(critDisadvantage(8,7),4);
	let result8 = round(critDisadvantage(8,8),4);
	let result9 = round(critDisadvantage(8,9),4);
	let result10 = round(critDisadvantage(8,10),4);
	let result11 = round(critDisadvantage(8,11),4);
	let result12 = round(critDisadvantage(8,12),4);
	let result13 = round(critDisadvantage(8,13),4);
	let result14 = round(critDisadvantage(8,14),4);
	let result15 = round(critDisadvantage(8,15),4);
	let result16 = round(critDisadvantage(8,16),4);
	let result17 = round(critDisadvantage(8,17),4);
	let result18 = round(critDisadvantage(8,18),4);
	let result19 = round(critDisadvantage(8,19),4);
	let result20 = round(critDisadvantage(8,20),4);


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}

function UNITTESThitAndCritOddsDISADVANTAGE(){

	let result1 = round(hitDisadvantage(1,1),4);
	let result2 = round(hitDisadvantage(2,2),4);
	let result3 = round(hitDisadvantage(3,3),4);
	let result4 = round(hitDisadvantage(4,4),4);
	let result5 = round(hitDisadvantage(5,5),4);
	let result6 = round(hitDisadvantage(6,6),4);
	let result7 = round(hitDisadvantage(7,7),4);
	let result8 = round(hitDisadvantage(8,8),4);
	let result9 = round(hitDisadvantage(9,9),4);
	let result10 = round(hitDisadvantage(10,10),4);
	let result11 = round(hitDisadvantage(11,11),4);
	let result12 = round(hitDisadvantage(12,12),4);
	let result13 = round(hitDisadvantage(13,13),4);
	let result14 = round(hitDisadvantage(14,14),4);
	let result15 = round(hitDisadvantage(15,15),4);
	let result16 = round(hitDisadvantage(16,16),4);
	let result17 = round(hitDisadvantage(17,17),4);
	let result18 = round(hitDisadvantage(18,18),4);
	let result19 = round(hitDisadvantage(19,19),4);
	let result20 = round(hitDisadvantage(20,20),4);
	let result21 = round(hitDisadvantage(1,20),4);
	let result22 = round(hitDisadvantage(2,19),4);
	let result23 = round(hitDisadvantage(3,18),4);
	let result24 = round(hitDisadvantage(4,17),4);
	let result25 = round(hitDisadvantage(5,16),4);
	let result26 = round(hitDisadvantage(6,15),4);
	let result27 = round(hitDisadvantage(7,14) ,4);
	let result28 = round(hitDisadvantage(8,13),4);
	let result29 = round(hitDisadvantage(9,12) ,4);
	let result30 = round(hitDisadvantage(10,11),4);
	let result31 = round(hitDisadvantage(11,10),4);
	let result32 = round(hitDisadvantage(12,9),4);
	let result33 = round(hitDisadvantage(13,8),4);
	let result34 = round(hitDisadvantage(14,7),4);
	let result35 = round(hitDisadvantage(15,6),4);
	let result36 = round(hitDisadvantage(16,5),4);
	let result37 = round(hitDisadvantage(17,4),4);
	let result38 = round(hitDisadvantage(18,3),4);
	let result39 = round(hitDisadvantage(19,2),4);
	let result40 = round(hitDisadvantage(20,1),4);

	let result41 = round(missDisadvantage(1,20),4);
	let result42 = round(missDisadvantage(2,19),4);
	let result43 = round(missDisadvantage(3,18),4);
	let result44 = round(missDisadvantage(4,17),4);
	let result45 = round(missDisadvantage(5,16),4);
	let result46 = round(missDisadvantage(6,15),4);
	let result47 = round(missDisadvantage(7,14),4);
	let result48 = round(missDisadvantage(8,13),4);
	let result49 = round(missDisadvantage(9,12),4);
	let result50 = round(missDisadvantage(10,11),4);
	let result51 = round(missDisadvantage(11,10),4);
	let result52 = round(missDisadvantage(12,9),4);
	let result53 = round(missDisadvantage(13,8),4);
	let result54 = round(missDisadvantage(14,7),4);
	let result55 = round(missDisadvantage(15,6),4);
	let result56 = round(missDisadvantage(16,5),4);
	let result57 = round(missDisadvantage(17,4),4);
	let result58 = round(missDisadvantage(18,3),4);
	let result59 = round(missDisadvantage(19,2),4);
	let result60 = round(missDisadvantage(20,1),4);


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

	console.log("\x1b[32m"+"test passed"+"\x1b[0m");
}