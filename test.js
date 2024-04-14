function critStandard(hitChance,critRange){
	let d20 = 20.00;
	return Math.round((((d20 - critRange) + 1)/(d20 - (d20 - critRange) + 1))*10000)/10000;
}

function hitStandard(hitChance,critRange){
	let d20 = 20.00;
	return Math.round(((critRange-hitChance)/d20)*100)/100;
}

function missStandard(hitChance,critRange){
	let d20 = 20.00;
	return 1-hitStandard(hitChance,critRange);
}

UNITTESThitChanceOdds();
UNITTESTcritChanceOdds();
UNITTESThitAndCritOdds();

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
}

function assertEqual(a,b){
	if(a===b){
		console.log("test passed");
	}
	else {
		throw new Error("test failed:\n" +
			"Expected: " + b + "\n" +
			"Actual: " + a + "\n" +
			"Stack: " + new Error().stack);
	}
}