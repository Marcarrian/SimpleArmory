import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class AdminService {

  // Keyed off of spellId
  public knownMissingMounts = {
    '17458': true,  // Fluorescent Green Mechanostrider - only give to one player on accident
    '147595': true, // Stormcrow - unknown origin yet in game
    '127178': true, // Jungle Riding Crane - mop mounts never available
    '127180': true, // Albino Riding Crane - mop mounts never available
    '127213': true, // Black Riding Yak - mop mounts never available
    '123160': true, // Brown Riding Yak - mop mounts never available
    '127272': true, // Orange Water Strider - mop mounts never available
    '127274': true, // Jade Water Strider - mop mounts never available
    '123182': true, // White Riding Yak - mop mounts never available
    '127278': true, // Golden Water Strider - mop mounts never available
    '127209': true, // Black Riding Yak - mop mounts never available
    '215545': true, // Fel Bat (Test)
    '10788': true,  // Leopard - Alpha only mount
    '10790': true,  // Tiger - Alpha only mount
    '171618': true, // Ancient Leatherhide - unknown
    '48954': true,  // Old Swift Zhevra
    '242896': true, // Vicious War Fox (added in 7.3 but not available yet)
    '242897': true,
    '459': true,    // Gray Wolf - old mounts, marked not in game
    '581': true,    // Winter Wolf
    '578': true,    // Black Wolf
    '579': true,    // Red Wolf
    '15780': true,  // Green Mechanostrider
    '33630': true,  // Blue Mechanostrider
    '10795': true,  // Ivory Raptor
    '468': true,    // White Stallion
    '8980': true,   // Skelatal Horse
    '64656': true,  // Blue Skelatal Warhorse
    '6896': true,   // Black Ram
    '18363': true,  // Riding Kodo
    '49378': true,  // Brewfest Riding Kodo
    '66123': true,  // Magic Rooster - Draenei Male
    '66122': true,  // Magic Rooster
    '66124': true,  // Magic Rooster - Tauren Male
    '60136': true,  // Grand Caravan Mammoth
    '60140': true,  // Grand Caravan Mammoth
    '55164': true,  // Swift Spectral Gryphon
    '59572': true,  // Black Polar Bear
    '28828': true,  // Nether Drake
    '44317': true,  // Merciless Nether Drake
    '194046': true, // Swift Spectral Rylak
    '62048': true,  // Black Dragonhawk Mount
    '239363': true, // Swift Spectral Hippogryph
    '239767': true, // Ruby Qiraji Resonating Crystal - only available during holiday
    '239766': true, // Sapphire  Qiraji Resonating Crystal - only available during holiday
  };

  public knownMissingAchievements = {
    '7268': true,
    '7269': true,
    '7270': true,
    '8812': true, // You're Really Doing It Wrong (Level 90) - this one might actually be in game
  };

  // public AdminService($http, $log, SettingsService, $q) {
  //   return {
  //     getMissingMounts: function () {
  //       var defer = $q.defer();
  //
  //       $q
  //         .all([
  //           $http.get(SettingsService.jsonFiles.mounts, {isArray: true}).then(function (data) {
  //
  //             var myMounts = data.data;
  //             var allMounts = {};
  //             for (var key in myMounts) {
  //               var cat = myMounts[key];
  //               for (var k2 in cat.subcats) {
  //                 var subcat = cat.subcats[k2];
  //                 for (var i in cat.subcats[k2].items) {
  //                   var mount = subcat.items[i];
  //                   allMounts[mount.spellid] = mount;
  //                 }
  //               }
  //             }
  //
  //             return allMounts;
  //           }),
  //           $http
  //             .jsonp(
  //               'https://us.api.battle.net/wow/mount/?locale=en_US&apikey=kwptv272nvrashj83xtxcdysghbkw6ep&jsonp=JSON_CALLBACK',
  //               {cache: true},
  //             )
  //             .then(function (data) {
  //               return data;
  //             }),
  //         ])
  //         .then(function (data) {
  //
  //           var missingMounts = [];
  //           var allMounts = data[0];
  //           var blizzardMounts = data[1].data.mounts;
  //
  //           for (var key in blizzardMounts) {
  //             var mount = blizzardMounts[key];
  //
  //             if (!allMounts[mount.spellId] && !this.knownMissingMounts[mount.spellId]) {
  //               // Mount obj
  //               //  creatureId
  //               //  icon
  //               //  isAquatic
  //               //  isFlying
  //               //  isGround
  //               //  isJumping
  //               //  itemId
  //               //  name
  //               //  qualityId
  //               //  spellId
  //
  //               // check to make sure mount has stuff we require
  //               if (!mount.spellId) {
  //                 console.log('WARN: mount doesn\'t have spellId: ' + mount.name);
  //               }
  //               if (!mount.itemId) {
  //                 console.log('WARN: mount doesn\'t have itemId spellId: ' + mount.spellId + ' name: ' + mount.name);
  //               }
  //               if (!mount.icon) {
  //                 console.log('ERROR: mount doesn\'t have icon: ' + mount.name);
  //               }
  //
  //               // format it properly for me
  //               var myMount = {
  //                 'icon': mount.icon,
  //                 'name': mount.name,
  //               };
  //
  //               if (mount.spellId) {
  //                 myMount.spellid = mount.spellId;
  //               }
  //               if (mount.itemId) {
  //                 myMount.itemId = mount.itemId;
  //               }
  //
  //               missingMounts.push(myMount);
  //             }
  //           }
  //
  //           defer.resolve(missingMounts);
  //         });
  //
  //       return defer.promise;
  //     },
  //
  //     getMissingAchievements: function () {
  //       var defer = $q.defer();
  //       $q
  //         .all([
  //           $http.get(SettingsService.jsonFiles.achievements).then(function (data) {
  //
  //             var allAchievements = {};
  //             for (var key in data.data.supercats) {
  //               var supercat = data.data.supercats[key];
  //               for (var k2 in supercat.cats) {
  //                 var cat = supercat.cats[k2];
  //                 for (var k3 in cat.subcats) {
  //                   var subcat = cat.subcats[k3];
  //                   for (var k4 in subcat.items) {
  //                     var ach = subcat.items[k4];
  //                     allAchievements[ach.id] = ach;
  //                   }
  //                 }
  //               }
  //             }
  //
  //             return allAchievements;
  //           }),
  //           $http
  //             .jsonp(
  //               'https://us.api.battle.net/wow/data/character/achievements?locale=en_US&apikey=kwptv272nvrashj83xtxcdysghbkw6ep&jsonp=JSON_CALLBACK',
  //               {cache: true},
  //             )
  //             .then(function (data) {
  //               return data;
  //             }),
  //           $http.get('/criteria/').then(function (data) {
  //             // special route I host during development to query wowhead to get around
  //             // cors issues
  //             return data.data;
  //           }),
  //         ])
  //         .then(function (data) {
  //
  //           var missingAchievements = [];
  //           var allAchievements = data[0];
  //           var blizzardAchievements = data[1].data.achievements;
  //           var wowheadCriteria = data[2];
  //
  //           for (var key in blizzardAchievements) {
  //             var supercat = blizzardAchievements[key];
  //
  //             // categories
  //             for (var c1 in supercat.categories) {
  //               var cat = supercat.categories[c1];
  //               for (var a in cat.achievements) {
  //                 var ach1 = cat.achievements[a];
  //                 this.checkAch(ach1, allAchievements, missingAchievements, wowheadCriteria);
  //               }
  //             }
  //
  //             // top level achievements
  //             for (var b in supercat.achievements) {
  //               var ach2 = supercat.achievements[b];
  //               this.checkAch(ach2, allAchievements, missingAchievements, wowheadCriteria);
  //             }
  //           }
  //
  //           defer.resolve(missingAchievements);
  //         });
  //
  //       return defer.promise;
  //     },
  //
  //     getMountData: function () {
  //       return $http.get(SettingsService.jsonFiles.mounts, {cache: true, isArray: true}).then(function (data) {
  //         return data.data;
  //       });
  //     },
  //
  //     getAchievementData: function () {
  //       return $http.get(SettingsService.jsonFiles.achievements, {cache: true}).then(function (data) {
  //         return data.data;
  //       });
  //     },
  //   };
  // }
  //
  // public checkAch(ach, allAchievements, missing, wowheadCriteria) {
  //   if (!allAchievements[ach.id] && !knownMissingAchievements[ach.id]) {
  //
  //     if (ach.criteria && ach.criteria.length > 1) {
  //       // reset the criteria to wowhead based
  //       var newCriteria = {};
  //
  //       var critObj = wowheadCriteria[ach.id];
  //       for (var wowheadId in critObj) {
  //         if (critObj.hasOwnProperty(wowheadId)) {
  //           var wowArray = critObj[wowheadId];
  //
  //           wowArray.forEach(function (blizArray) {
  //             var blizId = blizArray[1];
  //             newCriteria[blizId] = wowheadId;
  //           });
  //         }
  //       }
  //
  //       // update the criteria for the object
  //       ach.criteria = newCriteria;
  //     }
  //     else {
  //       delete ach['criteria'];
  //     }
  //
  //     console.log('NOT FOUND: ' + ach.id + ' - ' + ach.title + '...');
  //     missing.push(ach);
  //   }
  // }

}
