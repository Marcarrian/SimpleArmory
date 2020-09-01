// @Injectable({
//   providedIn: 'root',
// })
export class AchievementsService {

  constructor() {
  }

  // public AchievementsService($http, $log, LoginService, $routeParams, SettingsService, $q, $window) {
  //   // ignore achievements that shouldn't show up in the UI
  //   var ignoredFoundAchivements =
  //     {
  //       10050: true, // learn a primary prof
  //       10051: true,  // learn two primary prof
  //     };
  //
  //   //  cache results
  //   var parsedAchievements;
  //   LoginService.onLogin(function () {
  //     parsedAchievements = undefined;
  //   });
  //
  //   return {
  //     getAchievements: function () {
  //       var my_achievements, profile;
  //
  //       if (parsedAchievements) {
  //         return $q.when(parsedAchievements);
  //       }
  //
  //       return LoginService.getProfile($routeParams)
  //         .then(function (p) {
  //           profile = p;
  //
  //           // get achievements from service
  //           return $http.get(SettingsService.apiUrl($routeParams, 'achievements'), {cache: true});
  //         })
  //         .then(function (a) {
  //           my_achievements = a.data;
  //
  //           // now get the json of all the achievements
  //           return $http.get('data/achievements.json', {cache: true});
  //         })
  //         .then(function (ach_json_data) {
  //           parsedAchievements = parseAchievementObject(ach_json_data.data.supercats, profile, my_achievements, SettingsService, $window);
  //           return parsedAchievements;
  //         });
  //     },
  //   };
  //
  //   function parseAchievementObject(supercats, profile, achievements, settings, $window) {
  //     var obj = {};
  //     var completed = {};
  //     var critCompleted = {};
  //     var totalPossible = 0;
  //     var totalCompleted = 0;
  //     var totalFoS = 0;
  //     var totalLegacy = 0;
  //     var found = {};
  //     var name = '';
  //     var faction = '';
  //     $log.log('Parsing achievements.json...');
  //
  //     name = profile.name;
  //     faction = profile.faction;
  //
  //     // Build up lookup for achievements that character has completed
  //     achievements.achievements.forEach(ach => {
  //       if (ach.completed_timestamp) {
  //         // hash the achievement and its timestamp
  //         completed[ach.id] = ach.completed_timestamp;
  //       }
  //
  //       // Build up lookup for criteria that character has completed
  //       ach.criteria.forEach(crit => {
  //         if (crit.is_completed) {
  //           critCompleted[crit.id] = true;
  //         }
  //
  //         crit.child_criteria.forEach(child_crit => {
  //           if (child_crit.is_completed) {
  //             critCompleted[child_crit.id] = true;
  //           }
  //         });
  //       });
  //     });
  //
  //     // Lets parse out all the super categories and build out our structure
  //     supercats.forEach(supercat => {
  //       var possibleCount = 0;
  //       var completedCount = 0;
  //
  //       // Add the supercategory to the object, so we can do quick lookups on category
  //       obj[supercat.name] = {};
  //       obj[supercat.name].categories = [];
  //
  //       supercat.cats.forEach(cat => {
  //         var myCat = {'name': cat.name, 'subcats': []};
  //
  //         cat.subcats.forEach(subcat => {
  //           var mySubCat = {'name': subcat.name, 'achievements': []};
  //
  //           subcat.items.forEach(ach => {
  //
  //             // Mark this achievement in our found tracker
  //             found[ach.id] = true;
  //
  //             var myAchievement = ach, added = false;
  //
  //             // Store the date we completed it
  //             myAchievement.completed = completed[ach.id];
  //
  //             // if we're forcing all completed then set those up
  //             if (!myAchievement.completed && settings.debug) {
  //               myAchievement.completed = settings.fakeCompletionTime;
  //             }
  //
  //             // Hack: until blizz fixes api, don't stamp with date
  //             if (myAchievement.completed && myAchievement.completed !== settings.fakeCompletionTime) {
  //               myAchievement.rel = 'who=' + name + '&when=' + myAchievement.completed;
  //             }
  //
  //             // Always add it if we've completed it, it should show up regardless if its available
  //             if (myAchievement.completed) {
  //               added = true;
  //               mySubCat.achievements.push(myAchievement);
  //
  //               // if this is feats of strength then I want to keep a seperate count for that
  //               // since its not a percentage thing
  //               if (supercat.name === 'Feats of Strength') {
  //                 totalFoS++;
  //               }
  //               else if (supercat.name === 'Legacy') {
  //                 totalLegacy++;
  //               }
  //             }
  //             else if (ach.criteria) {
  //
  //               // build up rel based on completed criteria for the achievement
  //               // and pass that along to wowhead
  //               //cri=40635:40636:40637:40638:40640:40641:40642:40643:40644:40645
  //               var criCom = [];
  //               ach.criteria.forEach((wowheadCrit, blizzCrit) => {
  //                 if (critCompleted[blizzCrit]) {
  //                   criCom.push(wowheadCrit);
  //                 }
  //               });
  //
  //               if (criCom.length > 0) {
  //                 myAchievement.rel = 'cri=' + criCom.join(':');
  //               }
  //             }
  //
  //             // Update counts proper
  //             if (supercat.name !== 'Feats of Strength' && supercat.name !== 'Legacy' && !ach.notObtainable &&
  //               (!ach.side || ach.side === faction)) {
  //               possibleCount++;
  //               totalPossible++;
  //
  //               if (myAchievement.completed) {
  //                 completedCount++;
  //                 totalCompleted++;
  //               }
  //
  //               // if we haven't already added it, then this is one that should show up in the page of achievements
  //               // so add it
  //               if (!added) {
  //                 mySubCat.achievements.push(myAchievement);
  //               }
  //             }
  //           });
  //
  //           if (mySubCat.achievements.length > 0) {
  //             myCat.subcats.push(mySubCat);
  //           }
  //         });
  //
  //         // Add the category to the obj
  //         obj[supercat.name].categories.push(myCat);
  //       });
  //
  //       obj[supercat.name].possible = possibleCount;
  //       obj[supercat.name].completed = completedCount;
  //
  //       // Add the FoS count if this is the FoS
  //       if (supercat.name === 'Feats of Strength') {
  //         obj[supercat.name].foSTotal = totalFoS;
  //       }
  //       else if (supercat.name === 'Legacy') {
  //         obj[supercat.name].legacyTotal = totalLegacy;
  //       }
  //     });
  //
  //     for (var achId in found) {
  //       if (found.hasOwnProperty(achId) && !found[achId] && !ignoredFoundAchivements[achId]) {
  //         $window.ga('send', 'event', 'MissingAchievement', achId);
  //         console.log('WARN: Found achievement "' + achId + '" from character but not in db.');
  //       }
  //     }
  //
  //     // Add totals
  //     obj.possible = totalPossible;
  //     obj.completed = totalCompleted;
  //
  //     // Data object we expose externally
  //     return obj;
  //   }
  // }
}
