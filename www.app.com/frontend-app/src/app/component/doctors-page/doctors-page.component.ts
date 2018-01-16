import { Component, OnInit } from '@angular/core';
import {AuthStatus} from "../../status/auth-status";

@Component({
  selector: 'app-doctors-page',
  templateUrl: './doctors-page.component.html',
  styleUrls: ['./doctors-page.component.css']
})
export class DoctorsPageComponent implements OnInit {

  public searchString: string;

  public data: string[] = [];

  constructor(public authStatus: AuthStatus) {
    this.searchString = "";
  }

  ngOnInit() {
    this.initData();
  }

  filteredList(): string[] {
    return this.data.filter(row => row.includes(this.searchString)).slice(0, 10);
  }

  displayStreet(data: string): string {
    return data.split(" - ")[0];
  }

  displayName(data: string): string {
    return data.split(" - ")[1];
  }

  private initData(): void {
    this.data = [
      "Árpád utca - Fekete Nóra",
      "Batthyány utca 1-55. 2-56. - Fekete Nóra",
      "Béla utca 1-57. 2-90. - Fekete Nóra",
      "Bőség utca - Fekete Nóra",
      "Budapesti utca 1-33. 2-60. 94-104. - Fekete Nóra",
      "Csillag utca - Fekete Nóra",
      "Edit utca - Fekete Nóra",
      "Gáspár utca - Fekete Nóra",
      "Regele János utca 1-45. 2-44. - Fekete Nóra",
      "Homokdomb utca - Fekete Nóra",
      "Hősök tere - Fekete Nóra",
      "Ida utca 1-11. 2-12. - Fekete Nóra",
      "József utca 1-81. 2-60. - Fekete Nóra",
      "Kisterenye utca 29-53. 32-58. - Fekete Nóra",
      "Kornél utca - Fekete Nóra",
      "Kossuth Lajos utca 1-59. 2-56. - Fekete Nóra",
      "Körvasút sor 1-26. - Fekete Nóra",
      "Köztársaság utca 1-29. 2-28. - Fekete Nóra",
      "Krenedits Sándor 1-31. 2-32. - Fekete Nóra",
      "Magyarvár utca - Fekete Nóra",
      "Mária utca 2-86. 1-85. - Fekete Nóra",
      "Milán utca - Fekete Nóra",
      "Nádor utca - Fekete Nóra",
      "Ottó utca - Fekete Nóra",
      "Őrmester utca 1-35. - Fekete Nóra",
      "Pálffy tér - Fekete Nóra",
      "Pálya utca 1-57. 2-66. - Fekete Nóra",
      "Petra utca - Fekete Nóra",
      "Pirosrózsa utca 26-41. - Fekete Nóra",
      "Rákóczi utca 1-63. 2-56. - Fekete Nóra",
      "Rákosi utca 1-135. 2-130. - Fekete Nóra",
      "Róbert utca - Fekete Nóra",
      "Rózsa utca 1-67. 2-56. - Fekete Nóra",
      "Rózsabimbó utca - Fekete Nóra",
      "Sajtó utca - Fekete Nóra",
      "Sashalom utca - Fekete Nóra",
      "Sándor utca 1-77. 2-78. - Fekete Nóra",
      "Szatmári utca - Fekete Nóra",
      "Széchenyi utca - Fekete Nóra",
      "Szent István utca - Fekete Nóra",
      "Szentkorona utca 1-127. - Fekete Nóra",
      "Templom tér - Fekete Nóra",
      "Templom utca - Fekete Nóra",
      "Ungvári utca - Fekete Nóra",
      "Zombori utca - Fekete Nóra",
      "Aulich utca 1-57. 2-50. - Kerepeczki Ágnes",
      "Aurél utca 1-13. 2-14. - Kerepeczki Ágnes",
      "Baross utca 106-166. 115-169. - Kerepeczki Ágnes",
      "Csömöri utca 144-182. - Kerepeczki Ágnes",
      "Dobó utca páros 2-64. - Kerepeczki Ágnes",
      "Erik utca 1-3. 2-4. - Kerepeczki Ágnes",
      "Érsekújvári utca 1-19. 2-22. - Kerepeczki Ágnes",
      "Gusztáv utca 1-71. 2-86. - Kerepeczki Ágnes",
      "György utca 33-65. 2-84. - Kerepeczki Ágnes",
      "Háromszéki utca 1-17. 2-14. - Kerepeczki Ágnes",
      "Hársfavirág utca 1-49. 2-48. - Kerepeczki Ágnes",
      "Iglói utca páratlan oldal 1-23. - Kerepeczki Ágnes",
      "Iskola utca 2-56. 1-63. - Kerepeczki Ágnes",
      "János utca 124-192. 131-189. - Kerepeczki Ágnes",
      "Kenéz utca 38-74. 33-73. - Kerepeczki Ágnes",
      "Késmárki utca 1-7. 2-24. - Kerepeczki Ágnes",
      "Knézich utca 1-21. 2-30. - Kerepeczki Ágnes",
      "Ködös utca 1-29. 2-32. - Kerepeczki Ágnes",
      "Marcell utca 1-89. 2-62. - Kerepeczki Ágnes",
      "Nap utca 2-58. 1-63. - Kerepeczki Ágnes",
      "Nyitra utca 1-27. 2-24. - Kerepeczki Ágnes",
      "Pál utca 1-81. 2-82. - Kerepeczki Ágnes",
      "Petőfi utca 78-84. 77-83. - Kerepeczki Ágnes",
      "Piski utca 1-13. 2-12. - Kerepeczki Ágnes",
      "Rákosalotai határút 113-163. - Kerepeczki Ágnes",
      "Segesvár utca 2-16. 1-37. - Kerepeczki Ágnes",
      "Szilaspatak utca 64-90. - Kerepeczki Ágnes",
      "Thököly utca 120-126. 123-125. - Kerepeczki Ágnes",
      "Udvarhelyi utca 1-13. 2-14. - Kerepeczki Ágnes",
      "Vörösmarty utca 1-46. 2-44. - Kerepeczki Ágnes",
      "Akácfa utca 65-137. 54-112. - Hegedűs Ágnes",
      "Attila utca 65-145. 68-146. - Hegedűs Ágnes",
      "Baross utca 168-228. 171-235. - Hegedűs Ágnes",
      "Békés Imre tér - Hegedűs Ágnes",
      "Béla utca 59-191. 92-220. - Hegedűs Ágnes",
      "Csömöri utca 157-261. 184-270. - Hegedűs Ágnes",
      "Damjanich utca 2-24. 1-15. - Hegedűs Ágnes",
      "Diófa utca 65-145. 62-140. - Hegedűs Ágnes",
      "Dobó utca 31-67. - Hegedűs Ágnes",
      "Ferenc utca 1-65. 2-66. - Hegedűs Ágnes",
      "György utca 1-31. - Hegedűs Ágnes",
      "Hársfa utca 53-125. 44-128. - Hegedűs Ágnes",
      "Kenéz utca 2-36. 1-31. - Hegedűs Ágnes",
      "János utca 57-129. 60-122. - Hegedűs Ágnes",
      "Jávorfa utca 60-130. 49-143. - Hegedűs Ágnes",
      "Lajos utca 57-119. 54-114. - Hegedűs Ágnes",
      "Mátyás király utca 65-129. 58-116. - Hegedűs Ágnes",
      "Nagyvárad utca 1-19. 2-18. - Hegedűs Ágnes",
      "Párta utca 55-111. 56-126. - Hegedűs Ágnes",
      "Sarkad utca 53-109. 56-112. - Hegedűs Ágnes",
      "Szent Korona utca 129-265. 138-268. - Hegedűs Ágnes",
      "Szent Imre utca 55-135. 48-154. - Hegedűs Ágnes",
      "Szénás utca 55-131. 54-128. - Hegedűs Ágnes",
      "Szilaspatak utca 42-62. - Hegedűs Ágnes",
      "Temesvári utca 1-23. 2-24. - Hegedűs Ágnes",
      "Viola utca 1-77. 2-64. - Hegedűs Ágnes",
      "Wesselényi utca 45-123. 44-120. - Hegedűs Ágnes",
      "Állomás utca - Majsai Péterné Györgyi",
      "Baross utca 2-28. 1-39. - Majsai Péterné Györgyi",
      "Batthyány utca 58-. 57-. - Majsai Péterné Györgyi",
      "Brassói utca - Majsai Péterné Györgyi",
      "Csömöri utca 2-142. 1-155. - Majsai Péterné Györgyi",
      "Eperjes utca - Majsai Péterné Györgyi",
      "Iharfa utca - Majsai Péterné Györgyi",
      "Ilona utca 75-. 70-. - Majsai Péterné Györgyi",
      "József utca 62-98. 83-115. - Majsai Péterné Györgyi",
      "Kinizsi P. utca - Majsai Péterné Györgyi",
      "Kossuth L. utca - Majsai Péterné Györgyi",
      "Körvasút sor 28-. - Majsai Péterné Györgyi",
      "Köztársaság utca 31-. 30-. - Majsai Péterné Györgyi",
      "Krenedits S. utca 33-. 34-. - Majsai Péterné Györgyi",
      "Mályvarózsa utca - Majsai Péterné Györgyi",
      "Mária utca 87-. 88-. - Majsai Péterné Györgyi",
      "Matild utca - Majsai Péterné Györgyi",
      "Nefelejcs utca - Majsai Péterné Györgyi",
      "Pálya utca 59-127. 68-. - Majsai Péterné Györgyi",
      "Rákóczi utca 58-92. 65-85. - Majsai Péterné Györgyi",
      "Rákospalotai határút 1-5. - Majsai Péterné Györgyi",
      "Rózsa utca 69-. 60-. - Majsai Péterné Györgyi",
      "Sándor utca 80-. 79-, - Majsai Péterné Györgyi",
      "Szalmarózsa tér - Majsai Péterné Györgyi",
      "Szalmarózsa utca - Majsai Péterné Györgyi",
      "Szent Imre utca 1-53. 2-46. - Majsai Péterné Györgyi",
      "Szentkorona utca 2-138. - Majsai Péterné Györgyi",
      "Szepesi utca - Majsai Péterné Györgyi",
      "Tavirózsa tér - Majsai Péterné Györgyi",
      "Tavirózsa utca - Majsai Péterné Györgyi",
      "Thököly utca 2-38. 1-31. - Majsai Péterné Györgyi",
      "Tulipánfa utca - Majsai Péterné Györgyi",
      "Zrínyi I. utca - Majsai Péterné Györgyi",
      "Bács utca 1-39. 2-44. - Opóczki Gabriella",
      "Baross utca 30-104. 41-113. - Opóczki Gabriella",
      "Bercsényi utca 2-62. 1-55. - Opóczki Gabriella",
      "Hársfavirág utca 51-57. 50-54. - Opóczki Gabriella",
      "Hunyadi utca 1-29. 2-28. - Opóczki Gabriella",
      "Iglói utca 2-12. - Opóczki Gabriella",
      "József utca 171-175. - Opóczki Gabriella",
      "Kossuth Lajos utca 93-105. 92-102. - Opóczki Gabriella",
      "Madách utca 2-44. 1-55. - Opóczki Gabriella",
      "Nonn János utca 1-3-5. - Opóczki Gabriella",
      "Pálya utca 129-141. - Opóczki Gabriella",
      "Petőfi utca 1-75. 2-76. - Opóczki Gabriella",
      "Rákóczi utca 94-166. 87-141. - Opóczki Gabriella",
      "Rákospalotai határút 7-111. - Opóczki Gabriella",
      "Rigó utca 1-41. 2-42. - Opóczki Gabriella",
      "Sas utca 1-19. 2-22. - Opóczki Gabriella",
      "Szabadkai utca 1-41. 2-42. - Opóczki Gabriella",
      "Szilágyi Dezső utca 1-23. 2-22. - Opóczki Gabriella",
      "Thököly utca 40-118. 33-121. - Opóczki Gabriella",
      "Tordai utca 1-27. 2-28. - Opóczki Gabriella",
      "Arany János utca 2-56. - Opóczki Gabriella",
      "Baross Gábor utca 1-53. 2-44. - Opóczki Gabriella",
      "Centenáriumi st. 16-24. - Opóczki Gabriella",
      "Diófa utca 1-47. 2-38. - Opóczki Gabriella",
      "Emma utca 2-18. 1-19. - Opóczki Gabriella",
      "Futórózsa utca 65-81. 89-95. - Opóczki Gabriella",
      "Géza utca 1-31. 2-26. - Opóczki Gabriella",
      "Gida utca 2-6. 1-5. - Opóczki Gabriella",
      "Hársfa utca 1-51. 2-42. - Opóczki Gabriella",
      "Hárskút utca 2-6. 1-7. - Opóczki Gabriella",
      "Hermina utca 1-107. - Opóczki Gabriella",
      "Jávorfa utca 1-45. 2-40. - Opóczki Gabriella",
      "Kalitka utca 1-11. 2-10. - Opóczki Gabriella",
      "Molnár I. st. 2. - Opóczki Gabriella",
      "Orsika tér 2-10. - Opóczki Gabriella",
      "Sassvári utca 99a,b,c-103a,b,c. - Opóczki Gabriella",
      "Tölgyfa utca 1-3. 2-4. - Opóczki Gabriella"
    ]
  }

}
