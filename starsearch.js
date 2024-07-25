const UNITS_PER_LIGHTYEAR = 2000;
const BODY_TYPES = { // {{{
    'arid': 'Arid',
    'barren': 'Barren',
    'barren2': 'Barren',
    'barren3': 'Barren',
    'barren_castiron': 'Barren',
    'barren_venuslike': 'Barren',
    'barren-bombarded': 'Barren-Bombarded',
    'barren-desert': 'Barren-Desert',
    'black_hole': 'Black Hole',
    'star_blue_giant': 'Blue Giant',
    'star_blue_supergiant': 'Blue Supergiant',
    'star_browndwarf': 'Brown Dwarf',
    'cryovolcanic': 'Cryovolcanic',
    'desert': 'Desert',
    'desert1': 'Desert',
    'frozen': 'Frozen',
    'frozen1': 'Frozen',
    'frozen2': 'Frozen',
    'frozen3': 'Frozen',
    'gas_giant': 'Gas Giant',
    'ice_giant': 'Ice Giant',
    'irradiated': 'Irradiated',
    'jungle': 'Jungle',
    'rocky_ice': 'Rocky Ice',
    'rocky_metallic': 'Rocky Metallic',
    'rocky_unstable': 'Rocky Unstable',
    'star_neutron': 'Neutron Star',
    'star_orange': 'Orange Star',
    'star_orange_giant': 'Orange Giant',
    'star_red_dwarf': 'Red Dwarf',
    'star_red_giant': 'Red Giant',
    'star_red_supergiant': 'Red Supergiant',
    'star_white': 'White Dwarf',
    'star_yellow': 'Yellow Star',
    'terran': 'Terran',
    'terran-eccentric': 'Terran Eccentric',
    'toxic': 'Toxic',
    'toxic_cold': 'Toxic',
    'tundra': 'Tundra',
    'lava': 'Volcanic',
    'lava_minor': 'Volcanic',
    'water': 'Water',
}; // }}}
const BODY_COLORS = { // {{{
    'arid': '#eac7aa',
    'barren': '#d8e1eb',
    'barren2': '#d8e1eb',
    'barren3': '#d8e1eb',
    'barren_castiron': '#d8e1eb',
    'barren_venuslike': '#eadf8d',
    'barren-bombarded': '#e2e4eb',
    'barren-desert': '#eaaa8e',
    'black_hole': '#ea8dea',
    'star_blue_giant': '#6ba1d8',
    'star_blue_supergiant': '#6ba1d8',
    'star_browndwarf': '#e54712',
    'cryovolcanic': '#8394d8',
    'desert': '#eac7aa',
    'desert1': '#eac7aa',
    'frozen': '#bfbfd8',
    'frozen1': '#bfbfd8',
    'frozen2': '#bfbfd8',
    'frozen3': '#bfbfd8',
    'gas_giant': '#ebc06a',
    'ice_giant': '#86beeb',
    'irradiated': '#be98e5',
    'jungle': '#a9d8ba',
    'nebula_center_young': '#2266d9',
    'nebula_center_average': '#8f72e6',
    'rocky_ice': '#ebebeb',
    'rocky_metallic': '#eaeab0',
    'rocky_unstable': '#ebc28a',
    'star_neutron': '#8fa1d8',
    'star_orange': '#d87221',
    'star_orange_giant': '#d87221',
    'star_red_dwarf': '#d80000',
    'star_red_giant': '#d80000',
    'star_red_supergiant': '#d80000',
    'star_white': '#d8d8d8',
    'star_yellow': '#d8d800',
    'terran': '#839cd8',
    'terran-eccentric': '#95b5eb',
    'toxic': '#d8c765',
    'toxic_cold': '#d8c765',
    'tundra': '#98dfea',
    'lava': '#eb7d3c',
    'lava_minor': '#eb7d3c',
    'water': '#3c84eb',
}; // }}}
const SURVEY_LEVELS = { // {{{
    undefined: 0,
    'SEEN': 1,
    'PRELIMINARY': 2,
    'FULL': 3,
} // }}}
const CONDITION_EFFECTS = { // {{{
    'ruins_scattered': { 'tech': 1, 'techmining': 1 },
    'ruins_widespread': { 'tech': 2, 'techmining': 1 },
    'ruins_extensive': { 'tech': 3, 'techmining': 1 },
    'ruins_vast': { 'tech': 4, 'techmining': 1 },
    'ore_sparse': { 'ore': -1, 'mining': 1 },
    'ore_moderate': { 'ore': 0, 'mining': 1 },
    'ore_abundant': { 'ore': 1, 'mining': 1 },
    'ore_rich': { 'ore': 2, 'mining': 1 },
    'ore_ultrarich': { 'ore': 3, 'mining': 1 },
    'rare_ore_sparse': { 'rare_ore': -1, 'mining': 1 },
    'rare_ore_moderate': { 'rare_ore': 0, 'mining': 1 },
    'rare_ore_abundant': { 'rare_ore': 1, 'mining': 1 },
    'rare_ore_rich': { 'rare_ore': 2, 'mining': 1 },
    'rare_ore_ultrarich': { 'rare_ore': 3, 'mining': 1 },
    'volatiles_trace': { 'volatiles': -1, 'mining': 1 },
    'volatiles_diffuse': { 'volatiles': 0, 'mining': 1 },
    'volatiles_abundant': { 'volatiles': 1, 'mining': 1 },
    'volatiles_plentiful': { 'volatiles': 2, 'mining': 1 },
    'organics_trace': { 'organics': -1, 'mining': 1 },
    'organics_common': { 'organics': 0, 'mining': 1 },
    'organics_abundant': { 'organics': 1, 'mining': 1 },
    'organics_plentiful': { 'organics': 2, 'mining': 1 },
    'farmland_poor': { 'food': -1, 'farming': 1 },
    'farmland_adequate': { 'food': 0, 'farming': 1 },
    'farmland_rich': { 'food': 1, 'farming': 1 },
    'farmland_bountiful': { 'food': 2, 'farming': 1 },
    'solar_array': { 'solar_food': 2 }, // Also counters Hot and Poor Light
    'habitable': { 'hazard_rating': -0.25, 'growth': 4 },
    'decivilized': { 'hazard_rating': 0.25, 'stability': -2, 'decivilization': 1 }, // TODO: +size growth
    'cold': { 'hazard_rating': 0.25, 'temperature': 1 },
    'very_cold': { 'hazard_rating': 0.50, 'temperature': 0 },
    'hot': { 'hazard_rating': 0.25, 'temperature': 3 },
    'very_hot': { 'hazard_rating': 0.50, 'temperature': 4 },
    'tectonic_activity': { 'hazard_rating': 0.25, 'tectonics': 1 },
    'extreme_tectonic_activity': { 'hazard_rating': 0.50, 'tectonics': 2 },
    'no_atmosphere': { 'hazard_rating': 0.50, 'atmosphere': 0 },
    'thin_atmosphere': { 'hazard_rating': 0.25, 'atmosphere': 1 },
    'toxic_atmosphere': { 'hazard_rating': 0.50, 'atmosphere': 4 },
    'dense_atmosphere': { 'hazard_rating': 0.50, 'atmosphere': 3 },
    'mild_climate': { 'hazard_rating': -0.25, 'weather': 0 }, // Also a growth bonus
    'extreme_weather': { 'hazard_rating': 0.25, 'weather': 2 },
    'low_gravity': { 'hazard_rating': 0.25, 'gravity': 0 },
    'high_gravity': { 'hazard_rating': 0.50, 'gravity': 2 },
    'irradiated': { 'hazard_rating': 0.50, 'radiation': 1 },
    'inimical_biosphere': { 'hazard_rating': 0.25, 'biosphere': 1 },
    'water_surface': { 'hazard_rating': 0.25, 'water': 1, 'food': 0, 'aquaculture': 1 },
    'poor_light': { 'hazard_rating': 0.25, 'light': 1 },
    'dark': { 'hazard_rating': 0.50, 'light': 0 },
    'meteor_impacts': { 'hazard_rating': 0.50, 'meteors': 1 },
    'pollution': { 'hazard_rating': 0.25, 'pollution': 1 },
}; // }}}
const HAZARD_NAMES = { // {{{
    'habitable': 'Habitable',
    'decivilized': 'Decivilized',
    'cold': 'Cold',
    'very_cold': 'Extreme Cold',
    'hot': 'Hot',
    'very_hot': 'Extreme Heat',
    'tectonic_activity': 'Tectonic Activity',
    'extreme_tectonic_activity': 'Extreme Tectonic Activity',
    'no_atmosphere': 'No Atmosphere',
    'thin_atmosphere': 'Thin Atmosphere',
    'toxic_atmosphere': 'Toxic Atmosphere',
    'dense_atmosphere': 'Dense Atmosphere',
    'mild_climate': 'Mild Climate',
    'extreme_weather': 'Extreme Weather',
    'low_gravity': 'Low Gravity',
    'high_gravity': 'High Gravity',
    'irradiated': 'Irradiated',
    'inimical_biosphere': 'Inimical Biosphere',
    'water_surface': 'Water-covered Surface',
    'poor_light': 'Poor Light',
    'dark': 'Darkness',
    'meteor_impacts': 'Meteor Impacts',
    'pollution': 'Pollution',
} // }}}
const COMMODITIES = { // {{{
    'organics': { 'value': 500, 'name': 'Organics', 'tier': 0 },
    'ore': { 'value': 1500, 'name': 'Ore', 'tier': 0.2 },
    'rare_ore': { 'value': 2000, 'name': 'Transplutonic Ore', 'tier': 0.3 },
    'food': { 'value': 1000, 'name': 'Food', 'tier': 1 },
    'metals': { 'value': 3000, 'name': 'Metals', 'tier': 1.1 },
    'rare_metals': { 'value': 6000, 'name': 'Transplutonics', 'tier': 1.2 },
    'volatiles': { 'value': 5000, 'name': 'Volatiles', 'tier': 1.2 },
    'fuel': { 'value': 750, 'name': 'Fuel', 'tier': 2 },
    'supplies': { 'value': 250, 'name': 'Supplies', 'tier': 2.1 },
    'heavy_machinery': { 'value': 500, 'name': 'Heavy Machinery', 'tier': 2.2 },
    'domestic_goods': { 'value': 300, 'name': 'Domestic Goods', 'tier': 2.3 },
    'organs': { 'value': 2000, 'name': 'Harvested Organs', 'tier': 2.4 },
    'drugs': { 'value': 1500, 'name': 'Recreational Drugs', 'tier': 2.5 },
    'hand_weapons': { 'value': 500, 'name': 'Heavy Armaments', 'tier': 2.6 },
    'luxury_goods': { 'value': 500, 'name': 'Luxury Goods', 'tier': 2.7 },
    'lobster': { 'name': 'Volturnian Lobster', 'tier': 2.8 },
    'crew': { 'name': 'Crew', 'tier': 3.1 },
    'marines': { 'name': 'Marines', 'tier': 3.4 },
    'ships': { 'value': 300, 'name': 'Ship Hulls & Weapons', 'tier': 4 },
}; // }}}
const INDUSTRIES = { // {{{
    'population': {
        'name': 'Population & Infrastructure',
        'is_industry': false,
        'improvement_desc': '+1 stability',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'demands': function (planet, stats, config) {
            const ret = {
                'food': planet.size,
                'domestic_goods': planet.size - 1,
                'luxury_goods': planet.size - 3,
                'drugs': planet.size - 2,
                'organs': planet.size - 3,
                'supplies': 3,
            };
            if (!planet.keywords.includes('habitable')) {
                ret['organics'] = planet.size - 1;
            }
            if (config.coronal_portal) {
                ret['rare_metals'] = 10;
            }
            if (config.orbital_fusion_lamp) {
                ret['volatiles'] = 10;
            }
            return ret;
        },
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1;
            const ret = {};
            if (planet.size > 3) ret.crew = planet.size - 3 + modifiers;
            if (planet.size > 4) ret.drugs = planet.size - 4 + modifiers;
            if (planet.size > 5) ret.organs = planet.size - 5 + modifiers;
            return ret;
        },
        'effects': function (planet, stats, config) {
            if (config.improvements) stats.stability.add(1, `Improvements (${this.name})`);
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages, ['food', 'organics']);
            if (limiter) stats.stability.add(-limiter.amount, limiter.name + ' shortage');
            if (!shortages.domestic_goods) stats.stability.add(1, 'Domestic goods demand met');
            // TODO: No luxury goods bonus if demand is 0 because market size is 3.
            if (!shortages.luxury_goods) stats.stability.add(1, 'Luxury goods demand met');
            if (config.coronal_portal && !shortages.rare_metals) {
                stats.tap_industry = 1;
            }
            if (config.orbital_fusion_lamp && shortages.volatiles) {
                let hazard_factor = .05;
                if (config.aicore >= 2) {
                    hazard_factor = .055;
                }
                const hazard = Math.min(0.5, shortages.volatiles.amount * hazard_factor);
                stats.hazard_rating.add(hazard, 'Orbital fusion lamp volatiles shortage');
            }
            // Supplies shortage doesn't seem to do anything.
            // Drugs shortage doesn't seem to do anything.
            // Organs shortage doesn't seem to do anything.
        },
        'artifacts': ['orbital_fusion_lamp', 'orbital_fusion_lamp_optional', 'coronal_portal'],
        // Improvement: increases Stability by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Hypershunt Tap: increases number of allowed industries by 1 if no shortage
        // Orbital Fusion Lamp: increases temperature by 1, sets minimum temperature to 2, sets light to 2.
    },
    'spaceport': {
        'name': 'Spaceport',
        'is_industry': false,
        'improvement_desc': '+20% accessibility',
        'alpha_desc': '+20% accessibility',
        'upkeep': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const penalizer = largest_shortage(shortages);
            const shortage_penalty = 1 + (0.1 * (penalizer?.amount ?? 0));
            return (planet.size - 2) * 3 * 500 * shortage_penalty;
        },
        'demands': planet => ({
            'fuel': planet.size - 2,
            'supplies': planet.size - 2,
            'ships': planet.size - 2,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = industrial_planning * 1;
            return {
                'crew': nonneg(planet.size - 1 + modifiers),
            }
        },
        'early_effects': function (planet, stats, config) {
            if (config.improvements) stats.accessibility.add(0.2, `Improvements (${this.name})`);
            if (config.aicore >= 3) stats.accessibility.add(0.2, `Alpha core (${this.name})`);
            if (config.fullerene_spool) stats.accessibility.add(0.3, `Fullerene spool (${this.name})`);
            stats.accessibility.add(0.5, this.name);
        },
        'effects': function (planet, stats, config) {
            stats.growth += 2;
        },
        'artifacts': ['fullerene_spool'],
        // Improvement: increases Accessibility by 20%p
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases Accessibility by 20%p
    },
    'megaport': {
        'name': 'Megaport',
        'is_industry': false,
        'improvement_desc': '+20% accessibility',
        'alpha_desc': '+20% accessibility',
        'upkeep': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const penalizer = largest_shortage(shortages)
            const shortage_penalty = 1 + (0.1 * (penalizer?.amount ?? 0));
            return (planet.size - 2) * 4 * 500 * shortage_penalty;
        },
        'demands': planet => ({
            'fuel': planet.size,
            'supplies': planet.size,
            'ships': planet.size,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = industrial_planning * 1;
            return {
                'crew': nonneg(planet.size + 1 + modifiers),
            }
        },
        'early_effects': function (planet, stats, config) {
            if (config.improvements) stats.accessibility.add(0.2, `Improvements (${this.name})`);
            if (config.aicore >= 3) stats.accessibility.add(0.2, `Alpha core (${this.name})`);
            if (config.fullerene_spool) stats.accessibility.add(0.3, `Fullerene spool (${this.name})`);
            stats.accessibility.add(0.8, this.name);
        },
        'effects': function (planet, stats, config) {
            stats.growth += planet.size;
        },
        // Improvement: increases Accessibility by 20%p
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases Accessibility by 20%p
        'artifacts': ['fullerene_spool'],
    },
    'waystation': {
        'name': 'Waystation',
        'is_industry': false,
        'improvement_desc': '+20% accessibility',
        'alpha_desc': 'greatly increases stockpiles',
        'upkeep': planet => (planet.size - 2) * 2 * 500,
        'demands': planet => ({
            'fuel': planet.size,
            'supplies': planet.size,
            'crew': planet.size,
        }),
        'early_effects': function (planet, stats, config) {
            if (config.improvements) stats.accessibility.add(0.2, `Improvements (${this.name})`);
            stats.accessibility.add(0.1, this.name);
        },
        // Adds stockpiled goods as long as demand is met
        // Improvement: increases Accessibility by 20%p
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases stockpiling rate and limits
    },
    'farming': {
        'name': 'Farming',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 1 * 500,
        'demands': planet => ({
            'heavy_machinery': planet.size - 3,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const modifiers = planet.conditions.food
                + (planet.conditions.solar_food ?? 0)
                + (config.soil_nanites ? 2 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1
                - (shortages.heavy_machinery?.amount ?? 0);
            return {
                'food': planet.size + modifiers,
            };
        },
        'artifacts': ['soil_nanites'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
    },
    'aquaculture': {
        'name': 'Aquaculture',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'demands': planet => ({
            'heavy_machinery': planet.size,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const modifiers = planet.conditions.food
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1
                - (shortages.heavy_machinery?.amount ?? 0);
            return {
                'food': planet.size + modifiers,
                // Also lobster
            };
        },
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
    },
    'mining': {
        'name': 'Mining',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 2 * 500,
        'demands': planet => ({
            'heavy_machinery': planet.size - 3,
            'drugs': planet.size,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const modifiers = config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1
                - (shortages.heavy_machinery?.amount ?? 0);
            const ret = {};
            if ('rare_ore' in planet.conditions) {
                ret.rare_ore = nonneg(planet.conditions.rare_ore + (planet.size - 2)
                    + (config.mantle_bore ? 3 : 0) + modifiers);
            }
            if ('ore' in planet.conditions) {
                ret.ore = nonneg(planet.conditions.ore + (planet.size)
                    + (config.mantle_bore ? 3 : 0) + modifiers);
            }
            if ('volatiles' in planet.conditions) {
                ret.volatiles = nonneg(planet.conditions.volatiles + (planet.size - 2)
                    + (config.plasma_dynamo ? 3 : 0) + modifiers);
            }
            if ('organics' in planet.conditions) {
                ret.organics = nonneg(planet.conditions.organics + (planet.size)
                    + (config.mantle_bore ? 3 : 0) + modifiers);
            }
            return ret;
        },
        'effects': function (planet, stats, config) {
            const ret = {};
            const shortages = get_shortages(this, planet, stats, config);
            // TODO: Check this.
            if (shortages.drugs) ret.growth = -(shortages.drugs?.amount ?? 0);
            return ret;
        },
        'artifacts': ['mantle_bore', 'plasma_dynamo'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Autonomous Mantle Bore: Increases rare ore, ore, and organics production by 3
        // Plasma Dynamo: Increases volatiles production by 3
    },
    'techmining': {
        'name': 'Tech-Mining',
        'is_industry': true,
        'improvement_desc': '+25% finds',
        'alpha_desc': '+25% finds',
        'upkeep': function (planet) {
            const base_upkeep = (planet.size - 2) * 2 * 500;
            const upkeep_cap = planet.conditions.tech * 1000;
            return Math.min(base_upkeep, upkeep_cap);
        },
        // Finds cool stuff.
        // Improvement: increases finds by 25%
    },
    'refining': {
        'name': 'Refining',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'demands': planet => ({
            'heavy_machinery': planet.size - 2,
            'ore': planet.size + 2,
            'rare_ore': planet.size,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const metals_limiter = largest_shortage(shortages, ['ore', 'heavy_machinery']);
            const rare_metals_limiter = largest_shortage(shortages, ['rare_ore', 'heavy_machinery']);
            const modifiers = (config.catalytic_core ? 3 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1;
            return {
                'metals': nonneg(planet.size + modifiers - (metals_limiter?.amount ?? 0)),
                'rare_metals': nonneg(planet.size - 2 + modifiers - (rare_metals_limiter?.amount ?? 0)),
            };
        },
        'artifacts': ['catalytic_core'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Catalytic Core: increases production by 3
    },
    'lightindustry': {
        'name': 'Light Industry',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 8 * 500,
        'demands': planet => ({
            'organics': planet.size,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const modifiers = (config.biofactory_embryo ? 2 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1
                - (shortages.organics?.amount ?? 0);
            const ret = {
                'domestic_goods': nonneg(planet.size + modifiers),
                'luxury_goods': nonneg(planet.size - 2 + modifiers),
            };
            if (config.makes_drugs) {
                ret['drugs'] = nonneg(planet.size - 2 + modifiers);
            }
            return ret;
        },
        'artifacts': ['biofactory_embryo'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Biofactory Embryo: increases production by 2
    },
    'heavyindustry': {
        'name': 'Heavy Industry',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 12 * 500,
        'demands': planet => ({
            'metals': planet.size,
            'rare_metals': planet.size - 2,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const rare_production = Math.max(1, planet.size - 2 - (limiter?.amount ?? 0));
            const modifiers = (config.pristine_nanoforge ? 3 : 0)
                + (config.corrupted_nanoforge ? 1 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1;
            return {
                'heavy_machinery': rare_production + modifiers,
                'supplies': rare_production + modifiers,
                'hand_weapons': rare_production + modifiers,
                'ships': rare_production + modifiers,
            };
        },
        'artifacts': ['corrupted_nanoforge', 'pristine_nanoforge'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Corrupted Nanoforge: increases production by 1, increases ship quality by 20%p
        // Pristine Nanoforge: increases production by 3, increases ship quality by 50%p
    },
    'orbitalworks': {
        'name': 'Orbital Works',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 12 * 500,
        'demands': planet => ({
            'metals': planet.size,
            'rare_metals': planet.size - 2,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const rare_production = Math.max(1, planet.size - 2 - (limiter?.amount ?? 0));
            const modifiers = (config.pristine_nanoforge ? 3 : 0)
                + (config.corrupted_nanoforge ? 1 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1;
            return {
                'heavy_machinery': rare_production + modifiers,
                'supplies': rare_production + modifiers,
                'hand_weapons': rare_production + modifiers,
                'ships': rare_production + modifiers,
            };
        },
        'artifacts': ['corrupted_nanoforge', 'pristine_nanoforge'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Corrupted Nanoforge: increases production by 1, increases ship quality by 20%p
        // Pristine Nanoforge: increases production by 3, increases ship quality by 50%p
    },
    'fuelprod': {
        'name': 'Fuel Production',
        'is_industry': true,
        'improvement_desc': '+1 production',
        'alpha_desc': '+1 production',
        'upkeep': planet => (planet.size - 2) * 10 * 500,
        'demands': planet => ({
            'volatiles': planet.size,
            'heavy_machinery': planet.size - 2,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const modifiers = (config.synchrotron ? 3 : 0)
                + config.improvements * 1
                + (config.aicore >= 3 ? 1 : 0)
                + industrial_planning * 1
                - (limiter?.amount ?? 0);
            return {
                'fuel': nonneg(planet.size - 2 + modifiers),
            };
        },
        'artifacts': ['synchrotron'],
        // Improvement: increases production by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases production by 1
        // Synchrotron Core: increases production by 3
    },
    'commerce': {
        'name': 'Commerce',
        'is_industry': true,
        'improvement_desc': '+25% income',
        'alpha_desc': '+25% income',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'effects': function (planet, stats, config) {
            const modifiers = (config.dealmaker_holosuite ? 0.5 : 0)
                + config.improvements * 0.25
                + (config.aicore >= 3 ? 0.25 : 0);
            stats.stability.add(-3, 'Commerce');
            stats.income.mul(1.25 + modifiers, 'Commerce');
        },
        'artifacts': ['dealmaker_holosuite'],
        // Improvement: increases income by 25%p
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases income by 25%p
        // Dealmaker Holosuite: increases income by 50%p
    },
    'orbitalstation': {
        'name': 'Orbital Station',
        'is_industry': false,
        'improvement_desc': '+1 stability',
        'alpha_desc': 'increases station combat effectiveness',
        'upkeep': planet => 1500,
        'demands': planet => ({
            'supplies': planet.size - 3,
            'crew': planet.size - 3,
        }),
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            stats.ground_forces.mul(1 + (0.5 * supplies_met), this.name);
            if (config.improvements) stats.stability.add(1, `Improvements (${this.name})`);
            if ((limiter?.amount ?? 0) < 1) stats.stability.add(1 - (limiter?.amount ?? 0), this.name);
        },
        // Improvement: Increases stability by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases station combat effectiveness
    },
    'battlestation': {
        'name': 'Battlestation',
        'is_industry': false,
        'improvement_desc': '+1 stability',
        'alpha_desc': 'increases station combat effectiveness',
        'upkeep': planet => 6000,
        'demands': planet => ({
            'supplies': planet.size - 1,
            'crew': planet.size - 1,
        }),
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            stats.ground_forces.mul(1 + (1.0 * supplies_met), this.name);
            if (config.improvements) stats.stability.add(1, `Improvements (${this.name})`);
            if ((limiter?.amount ?? 0) < 2) stats.stability.add(2 - (limiter?.amount ?? 0), this.name);
        },
        // Improvement: Increases stability by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases station combat effectiveness
    },
    'starfortress': {
        'name': 'Star Fortress',
        'is_industry': false,
        'improvement_desc': '+1 stability',
        'alpha_desc': 'increases station combat effectiveness',
        'upkeep': planet => 12500,
        'demands': planet => ({
            'supplies': planet.size + 1,
            'crew': planet.size + 1,
        }),
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            // TODO: Morvah 45% test shows that the game might not actually
            // take this multiplier into account. Bug?
            stats.ground_forces.mul(1 + (2.0 * supplies_met), this.name);
            if (config.improvements) stats.stability.add(1, `Improvements (${this.name})`);
            if ((limiter?.amount ?? 0) < 3) stats.stability.add(3 - (limiter?.amount ?? 0), this.name);
        },
        // Improvement: Increases stability by 1
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases station combat effectiveness
    },
    'grounddefenses': {
        'name': 'Ground Defenses',
        'is_industry': false,
        'improvement_desc': 'x1.25 ground defenses',
        'alpha_desc': 'x1.5 ground defenses',
        'upkeep': planet => (planet.size - 2) * 2 * 500,
        'demands': planet => ({
            'supplies': planet.size,
            'marines': planet.size,
            'hand_weapons': planet.size - 2,
        }),
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const fraction_met = 1 - (limiter ? limiter.amount / this.demands(planet)[limiter.commodity] : 0);
            if (config.aicore >= 3) stats.ground_forces.mul(1.5, `Alpha core (${this.name})`);
            if (config.improvements) stats.ground_forces.mul(1.25, `Improvements (${this.name})`);
            if (config.drone_replicator) stats.ground_forces.mul(1.5, 'Combat drone replicator');
            stats.ground_forces.mul(1 + (1.0 * fraction_met), this.name);
            if ((limiter?.amount ?? 0) < 1) stats.stability.add(1 - (limiter?.amount ?? 0), this.name);
        },
        'artifacts': ['drone_replicator'],
        // Improvement: Multiplies colony ground force by 1.25
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also multiplies colony ground force by 1.5
        // Combat Drone Replicators: Multiplies colony ground force by 1.5
    },
    'heavybatteries': {
        'name': 'Heavy Batteries',
        'is_industry': false,
        'improvement_desc': 'x1.25 ground defenses',
        'alpha_desc': 'x1.5 ground defenses',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'demands': planet => ({
            'supplies': planet.size,
            'marines': planet.size,
            'hand_weapons': planet.size - 2,
        }),
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const fraction_met = 1 - (limiter ? limiter.amount / this.demands(planet)[limiter.commodity] : 0);
            if (config.aicore >= 3) stats.ground_forces.mul(1.5, `Alpha core (${this.name})`);
            if (config.improvements) stats.ground_forces.mul(1.25, `Improvements (${this.name})`);
            if (config.drone_replicator) stats.ground_forces.mul(1.5, 'Combat drone replicator');
            stats.ground_forces.mul(1 + (2.0 * fraction_met), this.name);
            if ((limiter?.amount ?? 0) < 1) stats.stability.add(1 - (limiter?.amount ?? 0), this.name);
        },
        'artifacts': ['drone_replicator'],
        // Improvement: Multiplies colony ground force by 1.25
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also multiplies colony ground force by 1.5
        // Combat Drone Replicators: Multiplies colony ground force by 1.5
    },
    'patrolhq': {
        'name': 'Patrol HQ',
        'is_industry': false,
        'improvement_desc': '+1 medium patrol',
        'alpha_desc': 'x1.25 fleet size',
        'upkeep': planet => 4000,
        'demands': planet => ({
            'fuel': planet.size - 1,
            'supplies': planet.size - 1,
            'ships': planet.size - 1,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = industrial_planning * 1;
            return {
                'crew': planet.size + modifiers,
            };
        },
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            if (config.aicore >= 3) stats.fleet_size.mul(1.25, `Alpha core (${this.name})`);
            stats.ground_forces.mul(1 + (0.1 * supplies_met), this.name);
            if ((limiter?.amount ?? 0) < 1) stats.stability.add(1 - (limiter?.amount ?? 0), this.name);
            if (config.cryoarithmetic_engine) {
                if (planet.conditions.temperature + stats.lamp_heat == 4) {
                    stats.fleet_size.add(1, 'Cryoarithmetic Engine');
                } else if (planet.conditions.temperature + stats.lamp_heat == 3) {
                    stats.fleet_size.add(0.25, 'Cryoarithmetic Engine');
                }
            }
            // TODO: Do shortages affect the number of light/medium/heavy fleets produced?
            return {
                'fleets': { 'light': 2, 'medium': config.improvements * 1, 'heavy': 0 },
            };
        },
        'artifacts': ['cryoarithmetic_engine'],
        // 2 light patrol fleets
        // Improvement: adds 1 medium patrol fleet
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases fleet size by 1.25x (applies a multiplier)
        // Cryoarithmetic Engine: adds 25% to base fleet size
    },
    'militarybase': {
        'name': 'Military Base',
        'is_industry': true,
        'improvement_desc': '+1 heavy patrol',
        'alpha_desc': 'x1.25 fleet size',
        'upkeep': planet => (planet.size - 2) * 10 * 500,
        'demands': planet => ({
            'fuel': planet.size + 1,
            'supplies': planet.size + 1,
            'ships': planet.size + 1,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = industrial_planning * 1;
            return {
                'crew': planet.size + modifiers,
                'marines': planet.size + modifiers,
            };
        },
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            if (config.aicore >= 3) stats.fleet_size.mul(1.25, `Alpha core (${this.name})`);
            stats.ground_forces.mul(1 + (0.2 * supplies_met), this.name);
            if ((limiter?.amount ?? 0) < 2) stats.stability.add(2 - (limiter?.amount ?? 0), this.name);
            if (config.cryoarithmetic_engine) {
                if (planet.conditions.temperature + stats.lamp_heat == 4) {
                    stats.fleet_size.add(1, 'Cryoarithmetic Engine');
                } else if (planet.conditions.temperature + stats.lamp_heat == 3) {
                    stats.fleet_size.add(0.25, 'Cryoarithmetic Engine');
                }
            }
            // TODO: Do shortages affect the number of light/medium/heavy fleets produced?
            return {
                'fleets': { 'light': 3, 'medium': 2, 'heavy': 1 + config.improvements * 1 },
            };
        },
        'artifacts': ['cryoarithmetic_engine'],
        // 3 light, 2 medium, 1 heavy patrol fleets
        // Improvement: adds 1 heavy patrol fleet
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases fleet size by 1.25x (applies a multiplier)
        // Cryoarithmetic Engine: adds 25% to base fleet size
    },
    'highcommand': {
        'name': 'High Command',
        'is_industry': true,
        'improvement_desc': '+1 heavy patrol',
        'alpha_desc': 'x1.25 fleet size',
        'upkeep': planet => (planet.size - 2) * 14 * 500,
        'demands': planet => ({
            'fuel': planet.size + 2,
            'supplies': planet.size + 2,
            'ships': planet.size + 2,
        }),
        'products': function (planet, stats, config, industrial_planning) {
            const modifiers = industrial_planning * 1;
            return {
                'crew': planet.size + modifiers,
                'marines': planet.size + modifiers,
            };
        },
        'effects': function (planet, stats, config) {
            const shortages = get_shortages(this, planet, stats, config);
            const limiter = largest_shortage(shortages);
            const supplies_met = 1 - (shortages.supplies ? shortages.supplies.amount / this.demands(planet).supplies : 0);
            if (config.aicore >= 3) stats.fleet_size.mul(1.25, `Alpha core (${this.name})`);
            stats.ground_forces.mul(1 + (0.3 * supplies_met), this.name);
            if ((limiter?.amount ?? 0) < 2) stats.stability.add(2 - (limiter?.amount ?? 0), this.name);
            if (config.cryoarithmetic_engine) {
                if (planet.conditions.temperature + stats.lamp_heat == 4) {
                    stats.fleet_size.add(1, 'Cryoarithmetic Engine');
                } else if (planet.conditions.temperature + stats.lamp_heat == 3) {
                    stats.fleet_size.add(0.25, 'Cryoarithmetic Engine');
                }
            }
            // TODO: Do shortages affect the number of light/medium/heavy fleets produced?
            return {
                'fleets': { 'light': 3, 'medium': 3, 'heavy': 2 + config.improvements * 1 },
            };
        },
        'artifacts': ['cryoarithmetic_engine'],
        // 3 light, 3 medium, 2 heavy patrol fleets
        // Improvement: adds 1 heavy patrol fleet
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also increases fleet size by 1.25x (applies a multiplier)
        // Cryoarithmetic Engine: adds 25% to base fleet size
    },
    'planetaryshield': {
        'name': 'Planetary Shield',
        'is_industry': false,
        'improvement_desc': 'x1.25 ground defenses',
        'alpha_desc': 'x1.5 ground defenses',
        'upkeep': planet => (planet.size - 2) * 3 * 500,
        'effects': function (planet, stats, config) {
            if (config.aicore >= 3) stats.ground_forces.mul(1.5, `Alpha core (${this.name})`);
            if (config.improvements) stats.ground_forces.mul(1.25, `Improvements (${this.name})`);
            stats.ground_forces.mul(3, this.name);
        },
        // Multiplies colony ground force by 3
        // Improvement: Multiplies colony ground force by 1.25
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also multiplies colony ground force by 1.5
    },
    'cryorevival': {
        'name': 'Cryorevival Facility',
        'is_industry': false,
        'improvement_desc': 'x2 population growth bonus',
        'alpha_desc': 'x2 population growth bonus',
        'upkeep': planet => (planet.size - 2) * 5 * 500,
        'demands': planet => ({
            'organics': 10,
        }),
        'effects': function (planet, stats, config) {
            // Cryosleeper Effectiveness (Beta Far Salish)
            //  Alpha Far Salish: "1.2 light years, 89% effectiveness" (distance: 2461.4308846685094)
            //  Alpha Laphirial: "6.0 light years, 46% effectiveness" (distance: 11990.34215525145)
            //  Delta Accreter-Hkere: "7.2 light years, 35% effectiveness" (distance: 14472.855454263336)
            //  Delta Michon: "9.5 light years, 15% effectiveness" (distance: 18991.831322966198)
            // Distance Effectiveness Multiplier: 1 - .9 * (ly_dist / 10)
            // "If any demand is unmet, maxiumum growth bonus is reduced by 50%."
            // 3 met, 7 unmet: "15% growth bonus multiplier based on met demand" (4 / 30 on AFS)
            // 6 met, 4 unmet: "30% growth bonus multiplier based on met demand" (8 / 30 on AFS)
            // 8 met, 2 unmet: "40% growth bonus multiplier based on met demand" (11 / 30 on AFS)
            // 9 met, 1 unmet: "45% growth bonus multiplier based on met demand" (12 / 30 on AFS)
            // Alpha core and improvements separately add floor(the same growth bonus as the structure itself).
            // Alpha and beta core change 5% step to 5.5% step, like fusion lamp
            return {};
        },
        // Increases growth point total by up to planet.size * 10. Lower bonus further away from cryosleeper.
        // Improvement: Doubles population growth bonus
        // Gamma: reduces demand by 1
        // Beta: also reduces upkeep by 25%
        // Alpha: also doubles population growth bonus
    },
};
for (const structure_id in INDUSTRIES) {
    INDUSTRIES[structure_id].id = structure_id;
}
// }}}
const NANOFORGE_NAMES = { // {{{
    1: 'Corrupted nanoforge',
    3: 'Pristine nanoforge',
} // }}}

var xml = undefined;
var coords = {};
var systems = {};
var bodies = {};
var markets = {};
var mcons = {};
var relations = {};
var faction_weights = {};
var comkts = [];
var fleet_size_doctrine;
var fleet_quality_doctrine;


class Stat {
    constructor(value, label) { // {{{
        this.addends = [];
        if (arguments.length == 2) {
            this.addends.push({ value, label });
        }
        this.multipliers = [];
    } // }}}

    includes(label) { // {{{
        return this.addends.reduce((found, item) => found || item.label == label, false);
    } // }}}

    add(value, label) { // {{{
        // TODO: Don't add if value === 0?
        this.addends.push({ value, label });
    } // }}}

    unadd(label) { // {{{
        this.addends = this.addends.filter(item => item.label != label);
    } // }}}

    mul(value, label) { // {{{
        this.multipliers.push({ value, label });
    } // }}}

    value() { // {{{
        const base = this.addends.reduce((sum, item) => sum + item.value, 0);
        return this.multipliers.reduce((product, item) => product * item.value, base);
    } // }}}
}


class System {
    constructor(name, x, y, tags) { // {{{
        this.name = name;
        this.x = x;
        this.y = y;
        this.tags = tags;
        this.r = Math.sqrt(x**2 + y**2);
        this.theta = 0 - Math.atan2(y, x);
        this.stars = [];
        this.bodies = [];
        this.neighbors = [];
        this.coronal_tap = false;
        this.coronal_tap_discovered = false;
        this.cryosleeper = false;
        this.cryosleeper_discovered = false;
    } // }}}

    add_body(body) { // {{{
        this.bodies.push(body);
    } // }}}
}


class Body {
    constructor(system, name, type, survey_level, keywords, tags, ruin_explored, core_techMiningMult) { // {{{
        this.system = system;
        this.name = name;
        this.type = type;
        this.size = 6; // Market size, not actual planet size
        this.survey_level = SURVEY_LEVELS[survey_level];
        this.keywords = keywords;
        /*
        // Compensate for missing high gravity in 0.95.1a RC5 and before
        if (this.type == 'gas_giant' || this.type == 'ice_giant') {
            this.keywords.push('high_gravity');
        }
        */
        if (this.keywords) {
            this.set_conditions(this.keywords);
        }
        this.tags = tags;
        this.coronal_tap = false;
        this.coronal_tap_discovered = false;
        this.cryosleeper = false;
        this.cryosleeper_discovered = false;
		this.ruin_explored = ruin_explored;
		if(this.ruin_explored == 'none' && !(typeof this.keywords === 'undefined')){
			if(this.keywords.includes('ruins_scattered') || 
			this.keywords.includes('ruins_widespread') ||
			this.keywords.includes('ruins_extensive') ||
			this.keywords.includes('ruins_vast')){
				this.ruin_explored = 'false'
			}
		}
		this.core_techMiningMult = core_techMiningMult;
    } // }}}

    set_conditions(keywords) { // {{{
        this.conditions = {
            'decivilization': 0,
            'temperature': 2,
            'tectonics': 0,
            'atmosphere': 2,
            'weather': 1,
            'gravity': 1,
            'radiation': 0,
            'biosphere': 0,
            'water': 0,
            'light': 2,
            'meteors': 0,
            'techmining': 0,
            'mining': 0,
            'farming': 0,
            'aquaculture': 0,
            'pollution': 0,
        };
        for (const keyword of keywords) {
            const effects = CONDITION_EFFECTS[keyword];
            for (const cond in effects) {
                if (cond != 'hazard_rating' && cond != 'stability') {
                    this.conditions[cond] = effects[cond];
                }
            }
        }
    } // }}}

    get_stats(criteria) { // {{{
        const stats = {
            'accessibility': new Stat(),
            'hazard_rating': new Stat(1, 'Base value'),
            'stability': new Stat(5, 'Base value'), // clamped 0-10
            'ground_forces': new Stat(),
            'fleet_size': new Stat(),
            'ship_quality': new Stat(),
            'growth': 0, // TODO: Pay more attention to this. Growth rate % equals growth / (300 * 2 ^ (size - 3))
            'income': new Stat(),
            'upkeep': new Stat(),
            'profit': new Stat(),
            'lamp_heat': 0,
            'tap_industry': 0,
        };
        for (const keyword of this.keywords) {
            const effects = CONDITION_EFFECTS[keyword];
            for (const cond in effects) {
                if (cond == 'hazard_rating') {
                    stats.hazard_rating.add(effects[cond], HAZARD_NAMES[keyword]);
                } else if (cond == 'stability') {
                    stats.stability.add(effects[cond], HAZARD_NAMES[keyword]);
                }
            }
        }
        if (this.keywords.includes('solar_array')) {
            stats.hazard_rating.unadd(HAZARD_NAMES.hot);
            stats.hazard_rating.unadd(HAZARD_NAMES.poor_light);
        }
        if (criteria.structures.population.orbital_fusion_lamp_optional) {
            if (stats.hazard_rating.includes(HAZARD_NAMES.cold)
                    || stats.hazard_rating.includes(HAZARD_NAMES.very_cold)
                    || stats.hazard_rating.includes(HAZARD_NAMES.poor_light)
                    || stats.hazard_rating.includes(HAZARD_NAMES.dark)) {
                criteria.structures.population.artifact = 'orbital_fusion_lamp';
                criteria.structures.population.orbital_fusion_lamp = true;
            } else {
                delete criteria.structures.population.artifact;
                delete criteria.structures.population.orbital_fusion_lamp_optional;
            }
        }
        if (criteria.structures.population.orbital_fusion_lamp) {
            stats.hazard_rating.unadd(HAZARD_NAMES.cold);
            stats.hazard_rating.unadd(HAZARD_NAMES.very_cold);
            stats.hazard_rating.unadd(HAZARD_NAMES.poor_light);
            stats.hazard_rating.unadd(HAZARD_NAMES.dark);
            if (this.keywords.includes('hot')) {
                stats.hazard_rating.unadd(HAZARD_NAMES.hot);
                stats.hazard_rating.add(CONDITION_EFFECTS.very_hot.hazard_rating, HAZARD_NAMES.very_hot);
                stats.lamp_heat = 1;
            } else if (!(this.keywords.includes('very_hot') || this.keywords.includes('cold')
                    || this.keywords.includes('very_cold'))) {
                stats.hazard_rating.add(CONDITION_EFFECTS.hot.hazard_rating, HAZARD_NAMES.hot);
                stats.lamp_heat = 1;
            }
        }
        return stats;
    } // }}}

    evaluate_artifacts() { // {{{
        this.possible_artifacts = {
            'coronal_portal': true, // Hypershunt Tap. See consider_other_factors for 10 ly logic.
            'orbital_fusion_lamp': true,
            'fullerene_spool': (this.type != 'gas_giant' && this.conditions.weather < 2 && this.conditions.tectonics < 2),
            'soil_nanites': (this.conditions.farming &&
                    !('rare_ore' in this.conditions) && !('volatiles' in this.conditions)),
            'mantle_bore': (this.type != 'gas_giant' && !this.keywords.includes('habitable')),
            'plasma_dynamo': (this.type == 'gas_giant'), // TODO: || ice_giant
            'catalytic_core': (this.conditions.atmosphere == 0),
            'biofactory_embryo': this.keywords.includes('habitable'),
            'corrupted_nanoforge': true,
            'pristine_nanoforge': true,
            'synchrotron': (this.conditions.atmosphere == 0),
            'dealmaker_holosuite': true,
            'cryoarithmetic_engine': (this.keywords.includes('hot')
                    || this.keywords.includes('very_hot')), // Installable on Hot planet with Orbital Solar Array!
            'drone_replicator': true,
        };
    } // }}}

    apply_structure_effects(stats, structure, config, timing) { // {{{
        const effect_func = (timing == 'early' ? 'early_effects' : 'effects');
        if (!(effect_func in INDUSTRIES[structure])) {
            return false;
        }
        const effects = INDUSTRIES[structure][effect_func](this, stats, config) || {};
        for (const cond in effects) {
            if (cond.endsWith('_multiplier')) {
                stats[cond].push(effects[cond]);
            } else {
                // TODO: Does this even happen?
                this.conditions[cond] += effects[cond];
            }
        }
    } // }}}

    prefilter_structures(criteria, spoiler_level) { // {{{
        let ruins_pass = true
        if (criteria.requested_ruins_score != null) {
            if (this.conditions.tech == null) ruins_pass = false
            else ruins_pass = this.conditions.tech >= criteria.requested_ruins_score
        }
        let ore_pass = true
        if (criteria.requested_ore_score != null) {
            if (this.conditions.ore == null) ore_pass = false
            else ore_pass = this.conditions.ore >= criteria.requested_ore_score
        }
        let rare_ore_pass = true
        if (criteria.requested_rare_ore_score != null) {
            if (this.conditions.rare_ore == null) rare_ore_pass = false
            else rare_ore_pass = this.conditions.rare_ore >= criteria.requested_rare_ore_score
        }
        let volatiles_pass = true
        if (criteria.requested_volatiles_score != null) {
            if (this.conditions.volatiles == null) volatiles_pass = false
            else volatiles_pass = this.conditions.volatiles >= criteria.requested_volatiles_score
        }
        let organics_pass = true
        if (criteria.requested_organics_score != null) {
            if (this.conditions.organics == null) organics_pass = false
            else organics_pass = this.conditions.organics >= criteria.requested_organics_score
        }
        let farmland_pass = true
        if (criteria.requested_farmland_score != null) {
            if (this.conditions.tech == null) farmland_pass = false
            else farmland_pass = this.conditions.food >= criteria.requested_farmland_score
        }

        const needs = criteria.structures;
        return ruins_pass && ore_pass && rare_ore_pass && volatiles_pass && organics_pass && farmland_pass && !(needs.techmining && !this.conditions.techmining
            || needs.farmingaquaculture && !(this.conditions.farming || this.conditions.aquaculture)
            || needs.mining && !this.conditions.mining
            || needs.population?.coronal_portal
                && (spoiler_level == 0 && this.coronal_tap_discovered === false
                    || spoiler_level > 0 && this.coronal_tap === false)
            || (needs.spaceport?.fullerene_spool || needs.megaport?.fullerene_spool)
                && !this.possible_artifacts.fullerene_spool
            || needs.farmingaquaculture?.soil_nanites && !this.possible_artifacts.soil_nanites
            || needs.mining?.mantle_bore && !this.possible_artifacts.mantle_bore
            || needs.mining?.plasma_dynamo && !this.possible_artifacts.plasma_dynamo
            || needs.refining?.catalytic_core && !this.possible_artifacts.catalytic_core
            || needs.lightindustry?.biofactory_embryo && !this.possible_artifacts.biofactory_embryo
            || needs.fuelprod?.synchrotron && !this.possible_artifacts.synchrotron
            || !this.possible_artifacts.cryoarithmetic_engine
                && (needs.patrolhq?.cryoarithmetic_engine
                    || needs.militarybase?.cryoarithmetic_engine
                    || needs.highcommand?.cryoarithmetic_engine)
            || needs.cryorevival
                && (spoiler_level == 0 && this.cryosleeper_discovered === false
                    || spoiler_level > 0 && this.cryosleeper === false)
            || criteria.market.domain_relay
                && (spoiler_level == 0 && !this.domain_relay_discovered
                    || spoiler_level > 0 && !this.domain_relay)
            || criteria.market.gate
                && (spoiler_level == 0 && !this.gate_discovered
                    || spoiler_level > 0 && !this.gate)
			|| criteria.market.solar_array && !this.keywords.includes('solar_array')
			|| criteria.market.habitable && !this.keywords.includes('habitable')
			|| criteria.market.decivilized && !this.keywords.includes('decivilized')
			|| criteria.market.cold && !this.keywords.includes('cold')
			|| criteria.market.very_cold && !this.keywords.includes('very_cold')
			|| criteria.market.hot && !this.keywords.includes('hot')
			|| criteria.market.very_hot && !this.keywords.includes('very_hot')
			|| criteria.market.tectonic_activity && !this.keywords.includes('tectonic_activity')
			|| criteria.market.extreme_tectonic_activity && !this.keywords.includes('extreme_tectonic_activity')
			|| criteria.market.no_atmosphere && !this.keywords.includes('no_atmosphere')
			|| criteria.market.thin_atmosphere && !this.keywords.includes('thin_atmosphere')
			|| criteria.market.toxic_atmosphere && !this.keywords.includes('toxic_atmosphere')
			|| criteria.market.dense_atmosphere && !this.keywords.includes('dense_atmosphere')
			|| criteria.market.mild_climate && !this.keywords.includes('mild_climate')
			|| criteria.market.extreme_weather && !this.keywords.includes('extreme_weather')
			|| criteria.market.low_gravity && !this.keywords.includes('low_gravity')
			|| criteria.market.high_gravity && !this.keywords.includes('high_gravity')
			|| criteria.market.irradiated && !this.keywords.includes('irradiated')
			|| criteria.market.inimical_biosphere && !this.keywords.includes('inimical_biosphere')
			|| criteria.market.water_surface && !this.keywords.includes('water_surface')
			|| criteria.market.poor_light && !this.keywords.includes('poor_light')
			|| criteria.market.dark && !this.keywords.includes('dark')
			|| criteria.market.meteor_impacts && !this.keywords.includes('meteor_impacts')
			|| criteria.market.pollution && !this.keywords.includes('pollution')
			|| (
			!(!criteria.market.type_arid 
			&& !criteria.market.type_barren 
			&& !criteria.market.type_barren_bombarded
			&& !criteria.market.type_barren_desert
			&& !criteria.market.type_cryovolcanic
			&& !criteria.market.type_desert
			&& !criteria.market.type_frozen
			&& !criteria.market.type_gas_giant
			&& !criteria.market.type_ice_giant
			&& !criteria.market.type_irradiated
			&& !criteria.market.type_jungle
			&& !criteria.market.type_rocky_ice
			&& !criteria.market.type_rocky_metallic
			&& !criteria.market.type_rocky_unstable
			&& !criteria.market.type_terran
			&& !criteria.market.type_terran_eccentric
			&& !criteria.market.type_toxic
			&& !criteria.market.type_tundra
			&& !criteria.market.type_volcanic
			&& !criteria.market.type_water) 
			&&
			(!criteria.market.type_arid && this.type =='arid'
			|| !criteria.market.type_barren && (this.type =='barren' || this.type =='barren2' || this.type =='barren3' || this.type =='barren_castiron' || this.type =='barren_venuslike')
			|| !criteria.market.type_barren_bombarded && this.type =='barren-bombarded'
			|| !criteria.market.type_barren_desert && this.type =='barren-desert'
			|| !criteria.market.type_cryovolcanic && this.type =='cryovolcanic'
			|| !criteria.market.type_desert && (this.type =='desert' || this.type =='desert1')
			|| !criteria.market.type_frozen && (this.type =='frozen' || this.type =='frozen1' || this.type =='frozen2' || this.type =='frozen3')
			|| !criteria.market.type_gas_giant && this.type =='gas_giant'
			|| !criteria.market.type_ice_giant && this.type =='ice_giant'
			|| !criteria.market.type_irradiated && this.type =='irradiated'
			|| !criteria.market.type_jungle && this.type =='jungle'
			|| !criteria.market.type_rocky_ice && this.type =='rocky_ice'
			|| !criteria.market.type_rocky_metallic && this.type =='rocky_metallic'
			|| !criteria.market.type_rocky_unstable && this.type =='rocky_unstable'
			|| !criteria.market.type_terran && this.type =='terran'
			|| !criteria.market.type_terran_eccentric && this.type =='terran-eccentric'
			|| !criteria.market.type_toxic && (this.type =='toxic' || this.type =='toxic_cold')
			|| !criteria.market.type_tundra && this.type =='tundra'
			|| !criteria.market.type_volcanic && (this.type =='lava_minor' || this.type =='lava')
			|| !criteria.market.type_water && this.type =='water')
			)
        );
    } // }}}

    rename_farmingaquaculture(criteria) { // {{{
        if (criteria.structures.farmingaquaculture) {
            if (this.conditions.farming) {
                criteria.structures.farming = criteria.structures.farmingaquaculture;
            } else if (this.conditions.aquaculture) {
                criteria.structures.aquaculture = criteria.structures.farmingaquaculture;
            }
            delete criteria.structures.farmingaquaculture;
        }
    } // }}}

    calculate_accessibility(criteria, stats, economy) { // {{{
        // Accessibility can be negative
        const distance_access = economy.search_markets[criteria.new_colony_id].proximity_isolation;
        if (distance_access >= 0) {
            stats.accessibility.add(distance_access, 'Proximity to other colonies');
        } else {
            stats.accessibility.add(distance_access, 'Isolation from other colonies');
        }
        stats.accessibility.add(-economy.faction_hostilities.player, 'Hostilities with other factions');
        if (this.conditions.gravity == 0) {
            stats.accessibility.add(0.10, HAZARD_NAMES['low_gravity']);
        } else if (this.conditions.gravity == 2) {
            stats.accessibility.add(-0.10, HAZARD_NAMES['high_gravity']);
        }
        if (this.size >= 5) {
            stats.accessibility.add(0.10 + 0.05 * nonneg(this.size - 5), 'Colony size');
        }
        if (!('spaceport' in criteria.structures || 'megaport' in criteria.structures)) {
            stats.accessibility.add(-1, 'No spaceport');
        }
        if (criteria.market.free_port) {
            stats.accessibility.add(0.25, 'Free port');
        }
        if (criteria.market.hypercognition) {
            stats.accessibility.add(0.1, 'Hypercognition');
        }
        for (const structure in criteria.structures) {
            this.apply_structure_effects(stats, structure, criteria.structures[structure], 'early');
        }
    } // }}}

    calculate_demand(criteria, stats) { // {{{
        stats.demands = {};
        for (const structure in criteria.structures) {
            const config = criteria.structures[structure];
            if ('demands' in INDUSTRIES[structure]) {
                const struct_dem = INDUSTRIES[structure].demands(this, stats, config);
                const aicore_discount = (config.aicore ? 1 : 0);
                for (const commodity in struct_dem) {
                    stats.demands[commodity] = Math.max(stats.demands[commodity] ?? 0,
                            nonneg(struct_dem[commodity] - aicore_discount));
                }
            }
        }
    } // }}}

    calculate_commodity_pool(stats, crossfaction_supply, infaction_supply) { // {{{
        stats.commodities = {};
        const port_cap = Math.max(0, Math.floor(stats.accessibility.value() * 10));
        const infaction_cap = Math.max(0, Math.floor(stats.accessibility.value() * 10) + 5);
        for (const commodity_id in COMMODITIES) {
            const commodity = {
                'demanded': stats.demands[commodity_id] ?? 0,
                'produced': stats.products[commodity_id] ?? 0,
                'used_local': 0,
                'available_infaction': Math.min(infaction_cap, infaction_supply[commodity_id] ?? 0),
                'imported_infaction': 0,
                'available_crossfaction': Math.min(port_cap, crossfaction_supply[commodity_id] ?? 0),
                'imported_crossfaction': 0,
                'shortage': 0,
            };
            commodity.used_local = Math.min(commodity.demanded, commodity.produced);
            let needed = nonneg(commodity.demanded - commodity.produced);
            if (needed > 0) {
                if (commodity.available_crossfaction > commodity.available_infaction
                        && commodity.demanded > commodity.available_infaction) {
                    const desired_import = nonneg((crossfaction_supply[commodity_id] ?? 0) - commodity.produced);
                    commodity.imported_crossfaction = Math.min(needed, desired_import, commodity.available_crossfaction)
                } else {
                    const desired_import = nonneg((infaction_supply[commodity_id] ?? 0) - commodity.produced);
                    commodity.imported_infaction = Math.min(needed, desired_import, commodity.available_infaction)
                }
                needed = nonneg(needed - (commodity.imported_crossfaction + commodity.imported_infaction));
            }
            commodity.shortage = needed;
            stats.commodities[commodity_id] = commodity;
        }
    } // }}}

    calculate_production(criteria, stats, crossfaction_supply, infaction_supply) { // {{{
        this.calculate_commodity_pool(stats, crossfaction_supply, infaction_supply);
        const infaction_cap = Math.max(0, Math.floor(stats.accessibility.value() * 10) + 5);
        var availability_changed = false;
        for (const structure in criteria.structures) {
            const config = criteria.structures[structure];
            if ('products' in INDUSTRIES[structure]) {
                const struct_prod = INDUSTRIES[structure].products(this, stats, config, criteria.market.industrial_planning);
                for (const commodity in struct_prod) {
                    const produced = struct_prod[commodity];
                    if (produced > (stats.products[commodity] ?? 0)) {
                        stats.products[commodity] = produced;
                        availability_changed = true;
                    }
                    const exportable = Math.min(produced, infaction_cap);
                    if (exportable > (infaction_supply[commodity] ?? 0)) {
                        infaction_supply[commodity] = exportable;
                        availability_changed = true;
                    }
                }
            }
        }
        return availability_changed;
    } // }}}

    calculate_stats(criteria, stats, spoiler_level) { // {{{
        if (criteria.market.free_port) {
            stats.stability.add(-3, 'Free port');
            stats.growth += 10;
        }
        if ((spoiler_level == 0 && this.domain_relay_discovered)
                || (spoiler_level > 0 && this.domain_relay)) {
            stats.stability.add(2, 'Comm relay');
        } else {
            stats.stability.add(1, 'Makeshift comm relay');
        }
        stats.fleet_size.add(0.5 + 0.25 * nonneg(this.size - 3), 'Colony size');
        stats.fleet_size.mul(1 + 0.125 * (fleet_size_doctrine - 1), 'Fleet doctrine');
        stats.ship_quality.add(0.125 * (fleet_quality_doctrine - 1), 'Fleet doctrine');
        // TODO: What about size 1 and 2?
        stats.ground_forces.add(this.size == 3 ? 50 : (100 * nonneg(this.size - 3)), `Base value for a size ${this.size} colony`);
        if (criteria.market.hypercognition) {
            stats.fleet_size.add(0.2, 'Hypercognition');
            stats.ground_forces.mul(1.5, 'Hypercognition');
            stats.stability.add(1, 'Hypercognition');
        }
        for (const structure in criteria.structures) {
            this.apply_structure_effects(stats, structure, criteria.structures[structure], 'late');
        }
        const industry_count = Object.keys(criteria.structures).reduce((c, s) => c + (INDUSTRIES[s].is_industry * 1), 0);
        const max_industries = this.size - 2 + stats.tap_industry;
        if (industry_count > max_industries) {
            stats.stability.add(-5, 'Maximum number of industries exceeded');
        }
        if (stats.commodities.ships.shortage) {
            const ships_proportion = 1 - stats.commodities.ships.shortage / stats.demands.ships;
            stats.fleet_size.mul(ships_proportion, 'Ship hulls & weapons shortage');
        }
        if (!stats.commodities.ships.available_infaction) {
            stats.ship_quality.add(-0.25, 'Cross-faction imports');
        }
        const clamped_stability = Math.min(Math.max(stats.stability.value(), 0), 10);
        stats.fleet_size.mul(0.75 + 0.05 * clamped_stability, 'Stability');
        stats.ship_quality.add(-0.25 + 0.05 * clamped_stability, 'Stability');
        stats.ground_forces.mul(0.25 + 0.075 * clamped_stability, 'Stability');
        if (clamped_stability < 5) {
            stats.income.mul(clamped_stability / 5, 'Stability');
        }
    } // }}}

    calculate_profit(criteria, stats, economy) { // {{{
        var total_demanded = 0;
        var infaction_produced = 0;
        for (const commodity in stats.demands) {
            total_demanded += stats.demands[commodity];
            if (stats.commodities[commodity].available_infaction >= stats.demands[commodity]) {
                infaction_produced += Math.min(stats.commodities[commodity].available_infaction, stats.demands[commodity]);
            } else if (stats.products[commodity]) {
                infaction_produced += Math.min(stats.products[commodity], stats.demands[commodity]);
            }
        }
        const infaction_proportion = infaction_produced / total_demanded;
        const infaction_cost_mod = 1 - Math.round(100 * infaction_proportion / 2) / 100;
        // Calculate total income and upkeep
        stats.income.add(nonneg(this.size - 2) * 10000, 'Local income');
        for (const commodity in stats.products) {
            if ((commodity == 'drugs' || commodity == 'organs') && !criteria.market.free_port) {
                continue;
            }
            if (commodity == 'crew' || commodity == 'marines') {
                continue;
            }
            const access_rounded = Math.round(100 * stats.accessibility.value()) / 100;
            const income = estimate_income(commodity, criteria.new_colony_id, economy);
            stats.income.add(income, COMMODITIES[commodity].name);
        }
        for (const structure in criteria.structures) {
            const config = criteria.structures[structure];
            const aicore_mod = (config.aicore >= 2 ? 0.75 : 1);
            stats.upkeep.add(INDUSTRIES[structure].upkeep(this, stats, config) * aicore_mod, INDUSTRIES[structure].name);
        }
        stats.upkeep.mul(stats.hazard_rating.value(), 'Hazard rating');
        if (infaction_cost_mod == 1) {
            stats.upkeep.mul(infaction_cost_mod, 'All demand supplied out-of-faction; no upkeep reduction');
        } else {
            stats.upkeep.mul(infaction_cost_mod, `Demand supplied in-faction (${(100 * infaction_proportion).toFixed(0)}%)`);
        }
        stats.profit.add(stats.income.value(), 'Income');
        stats.profit.add(-stats.upkeep.value(), 'Upkeep');
    } // }}}
}


function nonneg(num) { // {{{
    return (num < 0 ? 0 : num);
} // }}}

function get_named_child(node, tag_name) { // {{{
    if (node instanceof Element) {
        for (const child of node.children) {
            if (child.tagName == tag_name) {
                return child;
            }
        }
    }
    return undefined;
} // }}}

function get_coord(system) { // {{{
    const coord = get_named_child(system, 'l');
    if (coord && coord.hasAttribute('ref')) {
        return coords[coord.getAttribute('ref')];
    }
    return coord;
} // }}}

function get_system(body) { // {{{
    const system = get_named_child(body, 'cL');
    if (system) {
        const id = system.getAttribute('z') || system.getAttribute('ref');
        return systems[id];
    }
    console.log('Body has no cL tag.');
    return null;
} // }}}

function get_conditions(market) { // {{{
    var conditions = undefined;
    if (market) {
        conditions = [];
        const cond_tag = get_named_child(market, 'cond');
        const conditions_tag = get_named_child(market, 'conditions');
        if (cond_tag) {
            for (const st_tag of cond_tag.children) {
                conditions.push(st_tag.textContent);
            }
        } else if (conditions_tag) {
            for (const mcon of conditions_tag.children) {
                if (mcon.hasAttribute('ref')) {
                    conditions.push(mcons[mcon.getAttribute('ref')].getAttribute('i'));
                } else {
                    conditions.push(mcon.getAttribute('i'));
                }
            }
        }
    }
    return conditions;
} // }}}

function estimate_income(commodity, new_colony_id, economy) { // {{{
    const market_share = economy.search_shares[commodity][new_colony_id];
    const global_market_value = COMMODITIES[commodity]?.value * economy.total_demand[commodity];
    return market_share * global_market_value;
} // }}}

function deref_node(node) { // {{{
    if (!node || node.hasAttribute('z')) {
        return node;
    } else if (node.hasAttribute('ref')) {
        return xml.querySelector('[z="' + node.getAttribute('ref') + '"]');
    }
} // }}}

function parse_xml(contents) { // {{{
    coords = {};
    systems = {};
    bodies = {};
    markets = {};
    mcons = {};
    relations = {};
    faction_weights = {};
    comkts = [];
    const parser = new DOMParser();
    xml = parser.parseFromString(contents, 'text/xml');
    xml.querySelectorAll(':is(l, lIH)[z]').forEach(coord => coords[coord.getAttribute('z')] = coord);
    xml.querySelectorAll('factionIdOne').forEach(function (faction1_element) {
        const relation = faction1_element.parentNode;
        const value = Number(relation.getElementsByTagName('value')[0].textContent);
        const faction1_id = faction1_element.textContent;
        const faction2_id = relation.getElementsByTagName('factionIdTwo')[0].textContent;
        if (!(faction1_id in relations)) {
            relations[faction1_id] = {};
        }
        relations[faction1_id][faction2_id] = value;
        if (!(faction2_id in relations)) {
            relations[faction2_id] = {};
        }
        relations[faction2_id][faction1_id] = value;
    });
    // PCMarket = PlanetConditionMarket
    xml.querySelectorAll(':is(market, Market, [cl="Market"], [cl="PCMarket"])[z]').forEach(function (market_node) {
        const pcmo_tag = get_named_child(market_node, 'isPlanetConditionMarketOnly');
        const econ_group = get_named_child(market_node, 'econGroup');
        const real_market = (pcmo_tag && pcmo_tag.textContent === 'false' && !econ_group);
        if (real_market) {
            const market_id = market_node.getAttribute('z');
            const loc = get_named_child(market_node, 'location').textContent.split('|').map(part => Number(part));
            const size = Number(get_named_child(market_node, 'size').textContent);
            const faction = get_named_child(market_node, 'factionId')?.textContent;
            const hidden = get_named_child(market_node, 'hidden');
            // TODO: Remove && !hidden from this line?
            if (faction != 'player' && !hidden && size > 0) {
                // Source for -2 is https://fractalsoftworks.com/forum/index.php?topic=13672.msg230236#msg230236
                faction_weights[faction] = (faction_weights[faction] ?? 0) + Math.max(1, size - 2);
            }
            if (faction != 'player' && size > 0) {
                markets[market_id] = {
                    'location': { 'x': loc[0], 'y': loc[1] },
                    'size': size,
                };
            }
        }
    });
    // MCon = Market Conditions
    xml.querySelectorAll(':is(MCon, [cl="MCon"])[z]').forEach(mcon => mcons[mcon.getAttribute('z')] = mcon);
    // COMkt = Commodities on Market?
    xml.querySelectorAll('COMkt[z]').forEach(function (comkt_node) {
        const market = comkt_node.parentElement.parentElement;
        const participates = !get_named_child(market, 'econGroup');
        if (!participates) {
            return;
        }
        let access_mods = 0;
        market.querySelectorAll(':scope > accessibilityMod > fBs:not([s="core_base"],[s="core_hostile"])').forEach(function (fBs) {
            access_mods += Number(fBs.getAttribute('v'));
        });
        comkts.push({
            'market_id': market.getAttribute('z'),
            'faction': get_named_child(market, 'factionId').textContent,
            'commodity': comkt_node.getAttribute('c'),
            'supply': Number(comkt_node.getAttribute('mS')),
            'demand': Number(comkt_node.getAttribute('mD')),
            'access_mods': Math.round(100 * access_mods) / 100,
        });
    });
    xml.querySelectorAll(':is(Sstm, [cl="Sstm"])[z]').forEach(function (system_node) {	
        if(!(typeof system_node === 'undefined') && !(typeof get_coord(system_node) === 'undefined')){
			const name = system_node.getAttribute('bN');
			const coord = get_coord(system_node).textContent.split('|');
			const tags_element = get_named_child(system_node, 'tags');
			const tags = [];
			if(!(typeof tags_element.children === 'undefined')){
				for (const st of tags_element.children) {
					tags.push(st.textContent);
				}
			}
			const system = new System(name, Number(coord[0]), Number(coord[1]), tags);
			if (tags.includes('has_coronal_tap')) {
				const ccent = deref_node(system_node.getElementsByTagName('tap')[0]);
				const discovered = !(ccent.hasAttribute('di') && (ccent.getAttribute('di') === 'true'));
				system.coronal_tap = true;
				system.coronal_tap_discovered = discovered;
			}
			if (tags.includes('theme_derelict_cryosleeper')&& !(typeof system_node === 'undefined') && !(typeof system_node.querySelector('[cl="CryosleeperEntityPlugin"]') === 'undefined')&& system_node.querySelector('[cl="CryosleeperEntityPlugin"]') !== null) {			
				const ccent = system_node.querySelector('[cl="CryosleeperEntityPlugin"]').parentElement;
				const discovered = !(ccent.hasAttribute('di') && (ccent.getAttribute('di') === 'true'));
				system.cryosleeper = true;
				system.cryosleeper_discovered = discovered;
			}
			// TODO: if (system_node.querySelector('CampaignTerrain[type="pulsar_beam"])) {}
			systems[system_node.getAttribute('z')] = system;
		}
    });
    body_coords = {};
    xml.querySelectorAll('d[cl="Plnt"]').forEach(function (d_node) {
        const body_id = d_node.getAttribute('ref');
        const loc_node = get_named_child(d_node.parentElement.parentElement.parentElement, 'loc');
        const coords = loc_node.textContent.split('|');
        body_coords[body_id] = { 'x': Number(coords[0]), 'y': Number(coords[1]) };
    });
    xml.querySelectorAll(':is(Plnt, [cl="Plnt"], [ty="NEBULA"] > star)[z]').forEach(function (body) {
		const system = get_system(body);
		if(!(typeof system === 'undefined')){
			const name = JSON.parse(get_named_child(body, 'j0').textContent)['f0'];
			const type = get_named_child(body, 'type').textContent;
			const market = deref_node(get_named_child(body, 'market'));
			const survey_level = get_named_child(market, 'surveyLevel')?.textContent;
			const memory = get_named_child(market, 'memory');
			var ruin_explored = 'none';
			var core_techMiningMult = -1;
			if(!(typeof memory === 'undefined')){
				for (const mem of memory.children) {
					for (const mem1 of mem.children) {
						if(!(typeof mem1 === 'undefined') && !(typeof mem1.children[0] === 'undefined') && mem1.children[0].textContent == '$ruinsExplored'){
							ruin_explored = mem1.children[1].textContent;
						}else if(!(typeof mem1 === 'undefined') && !(typeof mem1.children[0] === 'undefined') && mem1.children[0].textContent == '$core_techMiningMult'){
							core_techMiningMult = mem1.children[1].textContent;
						}
					}
				}
			}
			const conditions = get_conditions(market);
			const faction = get_named_child(market, 'factionId')?.textContent;
			const tags_element = get_named_child(body, 'tags');
			const radius = Number(get_named_child(body, 'radius').textContent);
			const tags = [];
			for (const st of tags_element.children) {
				tags.push(st.textContent);
			}
			if ((typeof faction === 'undefined' || faction == 'player')) {
				const body_obj = new Body(system, name, type, survey_level, conditions, tags, ruin_explored, core_techMiningMult);
				const body_id = body.getAttribute('z');
				if (!tags.includes('star') && !system.tags.includes('theme_core_populated')) {
					bodies[body_id] = body_obj;
					system.add_body(body_obj);
				} else if (tags.includes('star')) {
					body_obj.radius = radius;
					if (!type.startsWith('nebula_')) {
						if(!(typeof(body_coords[body_id])=== 'undefined')){
							body_obj.x = body_coords[body_id].x;
							body_obj.y = body_coords[body_id].y;
						}
					} else {
						body_obj.x = system.x;
						body_obj.y = system.y;
					}
					system.stars.push(body_obj);
				}
			}
		}
    });
    xml.querySelectorAll(':is(CommRelayEP, [cl="CommRelayEP"])').forEach(function (comm_relay) {
        const ccent = comm_relay.parentElement;
        const discovered = !(ccent.hasAttribute('di') && (ccent.getAttribute('di') === 'true'));
        const system_node = get_named_child(ccent, 'cL')
        const system_id = system_node.getAttribute('ref') || system_node.getAttribute('z');
        const system = systems[system_id];
        const tags_element = get_named_child(ccent, 'tags');
        for (const st of tags_element.children) {
            if (st.textContent == 'makeshift') {
                return false;
            }
        }
		if(!(typeof system === 'undefined') && !(typeof system.bodies === 'undefined')){
			for (const body of system.bodies) {
				body.domain_relay = true;
				body.domain_relay_discovered = discovered;
			}
		}
    });
    xml.querySelectorAll(':is(GateEntityPlugin, [cl="GateEntityPlugin"])').forEach(function (gate_node) {
        const discovered = gate_node.getAttribute('aI') === 'true';
        const ccent = gate_node.parentElement;
        const system_node = get_named_child(ccent, 'cL')
        const system_id = system_node.getAttribute('ref') || system_node.getAttribute('z');
        const system = systems[system_id];
		if(!(typeof system === 'undefined') && !(typeof system.bodies === 'undefined')){
			for (const body of system.bodies) {
				body.gate = true;
				body.gate_discovered = discovered;
			}
		}
    });
    const player_faction_tag = deref_node(xml.getElementsByTagName('playerFaction')[0]);
    const doctrine_tag = get_named_child(player_faction_tag, 'doctrine');
    fleet_size_doctrine = Number(get_named_child(doctrine_tag, 'numShips').textContent);
    fleet_quality_doctrine = Number(get_named_child(doctrine_tag, 'shipQuality').textContent);
} // }}}

function find_neighbors(systems) { // {{{
    // Inefficient algorithm, but takes < 50 ms with typical data.
    for (const a of Object.values(systems)) {
        for (const b of Object.values(systems)) {
            a.neighbors.push({
                distance: Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2),
                system: b
            });
        }
        a.neighbors.sort((j, k) => j.distance - k.distance);
    }
} // }}}

function consider_other_factors(systems) { // {{{
    const ten_ly = 10 * UNITS_PER_LIGHTYEAR;
    for (const system of Object.values(systems)) {
        if (system.coronal_tap) {
            for (const neighbor of system.neighbors) {
                if (neighbor.distance > ten_ly) {
                    break;
                }
				if(!(typeof neighbor === 'undefined') && !(typeof neighbor.system === 'undefined') && !(typeof neighbor.system.bodies === 'undefined')){
					for (const body of neighbor.system.bodies) {
						if (body.coronal_tap === false || neighbor.distance < body.coronal_tap) {
							body.coronal_tap = neighbor.distance;
						}
						if ((body.coronal_tap_discovered === false || neighbor.distance < body.coronal_tap_discovered)
								&& system.coronal_tap_discovered) {
							body.coronal_tap_discovered = neighbor.distance;
						}
					}
				}
            }
        }
        if (system.cryosleeper) {
            for (const neighbor of system.neighbors) {
                if (neighbor.distance > ten_ly) {
                    break;
                }
				if(!(typeof neighbor === 'undefined') && !(typeof neighbor.system === 'undefined') && !(typeof neighbor.system.bodies === 'undefined')){
					for (const body of neighbor.system.bodies) {
						if (body.cryosleeper === false || neighbor.distance < body.cryosleeper) {
							body.cryosleeper = neighbor.distance;
						}
						if ((body.cryosleeper_discovered === false || neighbor.distance < body.cryosleeper_discovered)
								&& system.cryosleeper_discovered) {
							body.cryosleeper_discovered = neighbor.distance;
						}
					}
				}
            }
        }
    }
} // }}}

function calculate_hostilities(faction1, relations, faction_weights, search_sizes) { // {{{
    const search_weight = search_sizes.reduce((sum, size) => sum + Math.max(1, size - 2), 0);
    const hostile_weight = Object.entries(relations[faction1]).reduce(function (sum, entry) {
        const [faction2, relation] = entry;
        const weight = (faction2 == 'player' ? search_weight : (faction_weights[faction2] ?? 0));
        return sum + (relation <= -0.5 ? weight : 0)
    }, 0);
    const total_weight = Object.values(faction_weights).reduce((sum, item) => sum + item, 0) + search_weight;
    return Math.round(100 * hostile_weight / total_weight) / 100;
} // }}}

function calculate_proximity_isolation(save_markets, search_markets) { // {{{
    // -1 is fairly well-tested
    const save_weight = Object.values(save_markets).reduce((sum, market) => sum + market.size - 1, 0)
    const search_weight = search_markets.reduce((sum, market) => sum + market.size - 1, 0);
    const total_weight = save_weight + search_weight;
    const center = { 'x': 0, 'y': 0 };
    for (const market_id in save_markets) {
        const market = save_markets[market_id];
        center.x += market.location.x * (market.size - 1) / total_weight;
        center.y += market.location.y * (market.size - 1) / total_weight;
    }
    for (const market of search_markets) {
        center.x += market.location.x * (market.size - 1) / total_weight;
        center.y += market.location.y * (market.size - 1) / total_weight;
    }
    for (const market_id in save_markets) {
        const market = save_markets[market_id];
        const distance = Math.sqrt((market.location.x - center.x)**2 + (market.location.y - center.y)**2);
        market.proximity_isolation = 0.50 - 0.02 * Math.round(100 * distance / UNITS_PER_LIGHTYEAR) / 100;
        market.proximity_isolation = Math.round(100 * market.proximity_isolation) / 100;
    }
    for (const market of search_markets) {
        const distance = Math.sqrt((market.location.x - center.x)**2 + (market.location.y - center.y)**2);
        market.proximity_isolation = 0.50 - 0.02 * Math.round(100 * distance / UNITS_PER_LIGHTYEAR) / 100;
        market.proximity_isolation = Math.round(100 * market.proximity_isolation) / 100;
    }
} // }}}

function calculate_economy(save_markets, faction_hostilities, colony_set) { // {{{
    const search_markets = [];
    for (const [planet, criteria, stats] of colony_set) {
        search_markets.push({
            'location': { 'x': planet.system.x, 'y': planet.system.y },
            'size': planet.size,
        });
    }
    calculate_proximity_isolation(save_markets, search_markets);
    const total_amp = {};
    const crossfaction_supply = {};
    const total_demand = {};
    const market_amps = {};
    const search_market_amps = {};
    for (const comkt of comkts) {
        const commodity = comkt.commodity;
        const accessibility = (100 * comkt.access_mods
            + 100 * (save_markets[comkt.market_id]?.proximity_isolation || 0)
            - 100 * faction_hostilities[comkt.faction]) / 100;
        const port_cap = Math.max(0, Math.floor(accessibility * 10));
        const deliverable_supply = Math.min(comkt.supply, port_cap);
        const deliverable_demand = Math.min(comkt.demand, port_cap);
        if (comkt.faction != 'player') {
            total_amp[commodity] = (total_amp[commodity] ?? 0) + deliverable_supply * accessibility;
            crossfaction_supply[commodity] = Math.max((crossfaction_supply[commodity] ?? 0), deliverable_supply);
            total_demand[commodity] = (total_demand[commodity] ?? 0) + deliverable_demand;
            if (comkt.supply) {
                if (!(commodity in market_amps)) {
                    market_amps[commodity] = [];
                }
                market_amps[commodity].push({ 'market_id': comkt.market_id, 'amp': deliverable_supply * accessibility });
            }
        }
    }
    return {
        search_markets,
        faction_hostilities,
        total_amp,
        crossfaction_supply,
        total_demand,
        market_amps,
    };
} // }}}

function get_shortages(structure, planet, stats, config) { // {{{
    const structure_demands = structure.demands(planet, stats, config);
    const shortages = {};
    for (commodity_id in structure_demands) {
        const commodity = stats.commodities[commodity_id];
        const available = commodity.produced + commodity.imported_crossfaction + commodity.imported_infaction;
        const amount = nonneg(structure_demands[commodity_id] - (config.aicore ? 1 : 0) - available);
        if (amount > 0) {
            shortages[commodity_id] = { 'commodity': commodity_id, amount, 'name': COMMODITIES[commodity_id].name };
        }
    }
    return shortages;
} // }}}

function largest_shortage(shortages, commodities=[]) { // {{{
    let list = Object.values(shortages);
    if (commodities.length) {
        list = list.filter(shortage => shortage.commodity in commodities);
    }
    list.sort((a, b) => -(a.amount - b.amount));
    return list[0];
} // }}}

function get_colony_criteria(section) { // {{{
    let requested_ore_score = undefined;
    if (section.querySelector('input.ore_sparse').checked) {
        requested_ore_score = -1
    } else if (section.querySelector('input.ore_moderate').checked) {
        requested_ore_score = 0
    } else if (section.querySelector('input.ore_abundant').checked) {
        requested_ore_score = 1
    } else if (section.querySelector('input.ore_rich').checked) {
        requested_ore_score = 2
    } else if (section.querySelector('input.ore_ultrarich').checked) {
        requested_ore_score = 3
    }
    let requested_rare_ore_score = undefined;
    if (section.querySelector('input.rare_ore_sparse').checked) {
        requested_rare_ore_score = -1
    } else if (section.querySelector('input.rare_ore_moderate').checked) {
        requested_rare_ore_score = 0
    } else if (section.querySelector('input.rare_ore_abundant').checked) {
        requested_rare_ore_score = 1
    } else if (section.querySelector('input.rare_ore_rich').checked) {
        requested_rare_ore_score = 2
    } else if (section.querySelector('input.rare_ore_ultrarich').checked) {
        requested_rare_ore_score = 3
    }
    let requested_volatiles_score = undefined;
    if (section.querySelector('input.volatiles_trace').checked) {
        requested_volatiles_score = -1
    } else if (section.querySelector('input.volatiles_diffuse').checked) {
        requested_volatiles_score = 0
    } else if (section.querySelector('input.volatiles_abundant').checked) {
        requested_volatiles_score = 1
    } else if (section.querySelector('input.volatiles_plentiful').checked) {
        requested_volatiles_score = 2
    }
    let requested_organics_score = undefined;
    if (section.querySelector('input.organics_trace').checked) {
        requested_organics_score = -1
    } else if (section.querySelector('input.organics_common').checked) {
        requested_organics_score = 0
    } else if (section.querySelector('input.organics_abundant').checked) {
        requested_organics_score = 1
    } else if (section.querySelector('input.organics_plentiful').checked) {
        requested_organics_score = 2
    }
    let requested_farmland_score = undefined;
    if (section.querySelector('input.farmland_poor').checked) {
        requested_farmland_score = -1
    } else if (section.querySelector('input.farmland_adequate').checked) {
        requested_farmland_score = 0
    } else if (section.querySelector('input.farmland_rich').checked) {
        requested_farmland_score = 1
    } else if (section.querySelector('input.farmland_bountiful').checked) {
        requested_farmland_score = 2
    }
    let requested_ruins_score = undefined;
    if (section.querySelector('input.ruins_scattered').checked) {
        requested_ruins_score = -1
    } else if (section.querySelector('input.ruins_widespread').checked) {
        requested_ruins_score = 0
    } else if (section.querySelector('input.ruins_extensive').checked) {
        requested_ruins_score = 1
    } else if (section.querySelector('input.ruins_vast').checked) {
        requested_ruins_score = 2
    }
    const criteria = {
        requested_ore_score,
        requested_rare_ore_score,
        requested_volatiles_score,
        requested_organics_score,
        requested_farmland_score,
        requested_ruins_score,
        'market': {
            'player_governed': section.querySelector('input.player_governed').checked,
            'industrial_planning': section.querySelector('input.industrial_planning').checked,
            'hypercognition': section.querySelector('input.hypercognition').checked,
            'free_port': section.querySelector('input.free_port').checked,
            'domain_relay': section.querySelector('input.domain_relay').checked,
            'gate': section.querySelector('input.gate').checked,
			'ruins_scattered': section.querySelector('input.ruins_scattered').checked,
			'ruins_widespread': section.querySelector('input.ruins_widespread').checked,
			'ruins_extensive': section.querySelector('input.ruins_extensive').checked,
			'ruins_vast': section.querySelector('input.ruins_vast').checked,
			'ore_sparse': section.querySelector('input.ore_sparse').checked,
			'ore_moderate': section.querySelector('input.ore_moderate').checked,
			'ore_abundant': section.querySelector('input.ore_abundant').checked,
			'ore_rich': section.querySelector('input.ore_rich').checked,
			'ore_ultrarich': section.querySelector('input.ore_ultrarich').checked,
			'rare_ore_sparse': section.querySelector('input.rare_ore_sparse').checked,
			'rare_ore_moderate': section.querySelector('input.rare_ore_moderate').checked,
			'rare_ore_abundant': section.querySelector('input.rare_ore_abundant').checked,
			'rare_ore_rich': section.querySelector('input.rare_ore_rich').checked,
			'rare_ore_ultrarich': section.querySelector('input.rare_ore_ultrarich').checked,
			'volatiles_trace': section.querySelector('input.volatiles_trace').checked,
			'volatiles_diffuse': section.querySelector('input.volatiles_diffuse').checked,
			'volatiles_abundant': section.querySelector('input.volatiles_abundant').checked,
			'volatiles_plentiful': section.querySelector('input.volatiles_plentiful').checked,
			'organics_trace': section.querySelector('input.organics_trace').checked,
			'organics_common': section.querySelector('input.organics_common').checked,
			'organics_abundant': section.querySelector('input.organics_abundant').checked,
			'organics_plentiful': section.querySelector('input.organics_plentiful').checked,
			'farmland_poor': section.querySelector('input.farmland_poor').checked,
			'farmland_adequate': section.querySelector('input.farmland_adequate').checked,
			'farmland_rich': section.querySelector('input.farmland_rich').checked,
			'farmland_bountiful': section.querySelector('input.farmland_bountiful').checked,
			'solar_array': section.querySelector('input.solar_array').checked,
			'habitable': section.querySelector('input.habitable').checked,
			'decivilized': section.querySelector('input.decivilized').checked,
			'cold': section.querySelector('input.cold').checked,
			'very_cold': section.querySelector('input.very_cold').checked,
			'hot': section.querySelector('input.hot').checked,
			'very_hot': section.querySelector('input.very_hot').checked,
			'tectonic_activity': section.querySelector('input.tectonic_activity').checked,
			'extreme_tectonic_activity': section.querySelector('input.extreme_tectonic_activity').checked,
			'no_atmosphere': section.querySelector('input.no_atmosphere').checked,
			'thin_atmosphere': section.querySelector('input.thin_atmosphere').checked,
			'toxic_atmosphere': section.querySelector('input.toxic_atmosphere').checked,
			'dense_atmosphere': section.querySelector('input.dense_atmosphere').checked,
			'mild_climate': section.querySelector('input.mild_climate').checked,
			'extreme_weather': section.querySelector('input.extreme_weather').checked,
			'low_gravity': section.querySelector('input.low_gravity').checked,
			'high_gravity': section.querySelector('input.high_gravity').checked,
			'irradiated': section.querySelector('input.irradiated').checked,
			'inimical_biosphere': section.querySelector('input.inimical_biosphere').checked,
			'water_surface': section.querySelector('input.water_surface').checked,
			'poor_light': section.querySelector('input.poor_light').checked,
			'dark': section.querySelector('input.dark').checked,
			'meteor_impacts': section.querySelector('input.meteor_impacts').checked,
			'pollution': section.querySelector('input.pollution').checked,
			'type_arid': section.querySelector('input.planetTypeArid').checked,
			'type_barren': section.querySelector('input.planetTypeBarren').checked,
			'type_barren_bombarded': section.querySelector('input.planetTypeBarren-Bombarded').checked,
			'type_barren_desert': section.querySelector('input.planetTypeBarren-Desert').checked,
			'type_cryovolcanic': section.querySelector('input.planetTypeCryovolcanic').checked,
			'type_desert': section.querySelector('input.planetTypeDesert').checked,
			'type_frozen': section.querySelector('input.planetTypeFrozen').checked,
			'type_gas_giant': section.querySelector('input.planetTypeGas_Giant').checked,
			'type_ice_giant': section.querySelector('input.planetTypeIce_Giant').checked,
			'type_irradiated': section.querySelector('input.planetTypeIrradiated').checked,
			'type_jungle': section.querySelector('input.planetTypeJungle').checked,
			'type_rocky_ice': section.querySelector('input.planetTypeRocky_Ice').checked,
			'type_rocky_metallic': section.querySelector('input.planetTypeRocky_Metallic').checked,
			'type_rocky_unstable': section.querySelector('input.planetTypeRocky_Unstable').checked,
			'type_terran': section.querySelector('input.planetTypeTerran').checked,
			'type_terran_eccentric': section.querySelector('input.planetTypeTerran-Eccentric').checked,
			'type_toxic': section.querySelector('input.planetTypeToxic').checked,
			'type_tundra': section.querySelector('input.planetTypeTundra').checked,
			'type_volcanic': section.querySelector('input.planetTypeVolcanic').checked,
			'type_water': section.querySelector('input.planetTypeWater').checked,
        },
        'structures': {},
    };
    section.querySelectorAll('li.structure').forEach(function (li) {
        criteria.structures[li.dataset.structure] = {
            'improvements': (li.dataset.improvements == 'true'),
            'aicore': Number(li.dataset.aicore ?? 0),
            // TODO: minimum requirements?
        };
        if (li.dataset.artifact) {
            criteria.structures[li.dataset.structure].artifact = li.dataset.artifact;
            criteria.structures[li.dataset.structure][li.dataset.artifact] = true;
        }
    });
    return criteria;
} // }}}

function set_colony_criteria(section, criteria) { // {{{
    section.querySelector('input.player_governed').checked = criteria.market.player_governed;
    section.querySelector('input.industrial_planning').checked = criteria.market.industrial_planning;
    section.querySelector('input.hypercognition').checked = criteria.market.hypercognition;
    section.querySelector('input.free_port').checked = criteria.market.free_port;
    section.querySelector('input.domain_relay').checked = criteria.market.domain_relay;
    section.querySelector('input.gate').checked = criteria.market.gate;
	section.querySelector('input.ruins_scattered').checked = criteria.market.ruins_scattered;
	section.querySelector('input.ruins_widespread').checked = criteria.market.ruins_widespread;
	section.querySelector('input.ruins_extensive').checked = criteria.market.ruins_extensive;
	section.querySelector('input.ruins_vast').checked = criteria.market.ruins_vast;
	section.querySelector('input.ore_sparse').checked = criteria.market.ore_sparse;
	section.querySelector('input.ore_moderate').checked = criteria.market.ore_moderate;
	section.querySelector('input.ore_abundant').checked = criteria.market.ore_abundant;
	section.querySelector('input.ore_rich').checked = criteria.market.ore_rich;
	section.querySelector('input.ore_ultrarich').checked = criteria.market.ore_ultrarich;
	section.querySelector('input.rare_ore_sparse').checked = criteria.market.rare_ore_sparse;
	section.querySelector('input.rare_ore_moderate').checked = criteria.market.rare_ore_moderate;
	section.querySelector('input.rare_ore_abundant').checked = criteria.market.rare_ore_abundant;
	section.querySelector('input.rare_ore_rich').checked = criteria.market.rare_ore_rich;
	section.querySelector('input.rare_ore_ultrarich').checked = criteria.market.rare_ore_ultrarich;
	section.querySelector('input.volatiles_trace').checked = criteria.market.volatiles_trace;
	section.querySelector('input.volatiles_diffuse').checked = criteria.market.volatiles_diffuse;
	section.querySelector('input.volatiles_abundant').checked = criteria.market.volatiles_abundant;
	section.querySelector('input.volatiles_plentiful').checked = criteria.market.volatiles_plentiful;
	section.querySelector('input.organics_trace').checked = criteria.market.organics_trace;
	section.querySelector('input.organics_common').checked = criteria.market.organics_common;
	section.querySelector('input.organics_abundant').checked = criteria.market.organics_abundant;
	section.querySelector('input.organics_plentiful').checked = criteria.market.organics_plentiful;
	section.querySelector('input.farmland_poor').checked = criteria.market.farmland_poor;
	section.querySelector('input.farmland_adequate').checked = criteria.market.farmland_adequate;
	section.querySelector('input.farmland_rich').checked = criteria.market.farmland_rich;
	section.querySelector('input.farmland_bountiful').checked = criteria.market.farmland_bountiful;
	section.querySelector('input.solar_array').checked = criteria.market.solar_array;
	section.querySelector('input.habitable').checked = criteria.market.habitable;
	section.querySelector('input.decivilized').checked = criteria.market.decivilized;
	section.querySelector('input.cold').checked = criteria.market.cold;
	section.querySelector('input.very_cold').checked = criteria.market.very_cold;
	section.querySelector('input.hot').checked = criteria.market.hot;
	section.querySelector('input.very_hot').checked = criteria.market.very_hot;
	section.querySelector('input.tectonic_activity').checked = criteria.market.tectonic_activity;
	section.querySelector('input.extreme_tectonic_activity').checked = criteria.market.extreme_tectonic_activity;
	section.querySelector('input.no_atmosphere').checked = criteria.market.no_atmosphere;
	section.querySelector('input.thin_atmosphere').checked = criteria.market.thin_atmosphere;
	section.querySelector('input.toxic_atmosphere').checked = criteria.market.toxic_atmosphere;
	section.querySelector('input.dense_atmosphere').checked = criteria.market.dense_atmosphere;
	section.querySelector('input.mild_climate').checked = criteria.market.mild_climate;
	section.querySelector('input.extreme_weather').checked = criteria.market.extreme_weather;
	section.querySelector('input.low_gravity').checked = criteria.market.low_gravity;
	section.querySelector('input.high_gravity').checked = criteria.market.high_gravity;
	section.querySelector('input.irradiated').checked = criteria.market.irradiated;
	section.querySelector('input.inimical_biosphere').checked = criteria.market.inimical_biosphere;
	section.querySelector('input.water_surface').checked = criteria.market.water_surface;
	section.querySelector('input.poor_light').checked = criteria.market.poor_light;
	section.querySelector('input.dark').checked = criteria.market.dark;
	section.querySelector('input.meteor_impacts').checked = criteria.market.meteor_impacts;
	section.querySelector('input.pollution').checked = criteria.market.pollution;
	section.querySelector('input.planetTypeArid').checked = criteria.market.type_arid;
	section.querySelector('input.planetTypeBarren').checked = criteria.market.type_barren;
	section.querySelector('input.planetTypeBarren-Bombarded').checked = criteria.market.type_barren_bombarded;
	section.querySelector('input.planetTypeBarren-Desert').checked = criteria.market.type_barren_desert;
	section.querySelector('input.planetTypeCryovolcanic').checked = criteria.market.type_cryovolcanic;
	section.querySelector('input.planetTypeDesert').checked = criteria.market.type_desert;
	section.querySelector('input.planetTypeFrozen').checked = criteria.market.type_frozen;
	section.querySelector('input.planetTypeGas_Giant').checked = criteria.market.type_gas_giant;
	section.querySelector('input.planetTypeIce_Giant').checked = criteria.market.type_ice_giant;
	section.querySelector('input.planetTypeIrradiated').checked = criteria.market.type_irradiated;
	section.querySelector('input.planetTypeJungle').checked = criteria.market.type_jungle;
	section.querySelector('input.planetTypeRocky_Ice').checked = criteria.market.type_rocky_ice;
	section.querySelector('input.planetTypeRocky_Metallic').checked = criteria.market.type_rocky_metallic;
	section.querySelector('input.planetTypeRocky_Unstable').checked = criteria.market.type_rocky_unstable;
	section.querySelector('input.planetTypeTerran').checked = criteria.market.type_terran;
	section.querySelector('input.planetTypeTerran-Eccentric').checked = criteria.market.type_terran_eccentric;
	section.querySelector('input.planetTypeToxic').checked = criteria.market.type_toxic;
	section.querySelector('input.planetTypeTundra').checked = criteria.market.type_tundra;
	section.querySelector('input.planetTypeVolcanic').checked = criteria.market.type_volcanic;
	section.querySelector('input.planetTypeWater').checked = criteria.market.type_water;
	
    section_ul = section.querySelector('ul.structures');
    while (section_ul.firstChild) {
        section_ul.removeChild(section_ul.firstChild);
    }
    for (const structure in criteria.structures) {
        const config = criteria.structures[structure];
        let source_li;
        if (structure == 'population') {
            source_li = document.querySelector('section[data-colony].template li[data-structure="' + structure + '"]');
        } else {
            source_li = document.querySelector('div#choose_structures_dialog li[data-structure="' + structure + '"]');
        }
        const new_li = source_li.cloneNode(true);
        new_li.classList.remove('selected');
        delete new_li.dataset.group;
        new_li.addEventListener('click', open_configure_structure);
        if (config.improvements) {
            new_li.dataset.improvements = 'true';
        } else {
            delete new_li.dataset.improvements;
        }
        if (config.aicore) {
            new_li.dataset.aicore = config.aicore;
        } else {
            delete new_li.dataset.aicore;
        }
        if (config.artifact) {
            new_li.dataset.artifact = config.artifact;
        } else {
            delete new_li.dataset.artifact;
        }
        section_ul.appendChild(new_li);
    }
} // }}}

function choose(list, k, prefix=[]) { // {{{
    if (k <= 0) return [prefix];
    return list.flatMap((v, i) => choose(list.slice(i+1), k-1, [...prefix, v]));
} // }}}

function* permute(planet_lists, max_dist) { // {{{
    if (planet_lists.length == 1) {
        for (const item of planet_lists[0]) {		
				yield [item];
				//console.log(item.keywords);
        }
    } else {
        const deeper = permute(planet_lists.slice(1), max_dist);
        for (const deep_combo of deeper) {
            const last = deep_combo[0];
            for (const neighbor_system of last.system.neighbors) {
                if (neighbor_system.distance > max_dist) {
                    continue;
                }
                for (const neighbor_body of neighbor_system.system.bodies) {
                    if (!deep_combo.includes(neighbor_body) && planet_lists[0].includes(neighbor_body)) {
                        yield [neighbor_body, ...deep_combo];
                    }
                }
            }
        }
    }
} // }}}

function calculate_market_shares(economy) { // {{{
    economy.search_shares = {};
    for (const commodity in economy.market_amps) {
        const markets = economy.market_amps[commodity];
        economy.search_shares[commodity] = [0, 0, 0];
        for (const market of markets) {
            const share = market.amp / economy.total_amp[commodity];
            // Use Hamilton's method to apportion market share points.
            market.share_quota = Math.floor(100 * share) / 100;
            market.share_fraction = share - market.share_quota;
            market.share = market.share_quota;
        }
        markets.sort((a, b) => -1 * (a.share_fraction - b.share_fraction));
        const share_quota_sum = markets.reduce((sum, market) => sum + market.share_quota, 0);
        let i = 1 - share_quota_sum;
        for (const market of markets) {
            if (i > 0.001) { // avoiding floating-point error
                market.share += 0.01;
                i -= 0.01;
            }
            if (market.market_id.startsWith('__player_market_')) {
                const j = Number(market.market_id.substring('__player_market_'.length));
                economy.search_shares[commodity][j] = market.share;
            }
        }
    }
} // }}}

function calculate_quality_bonuses(colony_set) { // {{{
    const manufacturers = [];
    for (const [planet, criteria, stats] of colony_set) {
        if (criteria.structures.heavyindustry || criteria.structures.orbitalworks) {
            const has_corrupted_nanoforge = criteria.structures.heavyindustry?.corrupted_nanoforge
                || criteria.structures.orbitalworks?.corrupted_nanoforge || false;
            const has_pristine_nanoforge = criteria.structures.heavyindustry?.pristine_nanoforge
                || criteria.structures.orbitalworks?.pristine_nanoforge || false;
            const nanoforge_points = has_corrupted_nanoforge * 1 + has_pristine_nanoforge * 3;
            const orbitalworks_bonus = (criteria.structures.orbitalworks ? 20 : 0);
            const nanoforge_bonus = has_corrupted_nanoforge * 20 + has_pristine_nanoforge * 50;
            manufacturers.push({
                'ships': stats.products.ships,
                nanoforge_points,
                orbitalworks_bonus,
                nanoforge_bonus,
                'total_bonus': orbitalworks_bonus + nanoforge_bonus,
                planet,
            });
        }
    }
    manufacturers.sort((a, b) => (a.ships - b.ships) || (a.total_bonus - b.total_bonus));
    const winner = manufacturers.pop();
    for (const [planet, criteria, stats] of colony_set) {
        if (winner?.orbitalworks_bonus) {
            stats.ship_quality.add(winner.orbitalworks_bonus / 100, 'Orbital works'
                + ' (' + winner.planet.name + ')');
        }
        if (winner?.nanoforge_bonus) {
            stats.ship_quality.add(winner.nanoforge_bonus / 100, NANOFORGE_NAMES[winner.nanoforge_points]
                + ' (' + winner.planet.name + ')');
        }
    }
} // }}}

function evaluate_planet_sets(colonies, max_distance, max_distance_tocore, spoiler_level) { // {{{
    const player_governed_count = colonies.filter(c => c.market.player_governed).length;
    const management = (2 - player_governed_count) * 2;
    var least_profit = Number.MIN_SAFE_INTEGER;
    var combos = [];
    const faction_hostilities = {};
    for (const faction in relations) {
        faction_hostilities[faction] = calculate_hostilities(faction, relations, faction_weights, colonies.map(item => 6));
    }
    var search_begin_time = performance.now();
    var search_counter = 0;
    var search_counter_2 = 0;
    var interrupted = false;
    const colonies_candidates = [];
    for (const colony of colonies) {
        const candidates = [];
        for (const body_id in bodies) {
            const body = bodies[body_id];
            if (spoiler_level == 0 && body.survey_level < 3 || body.system.r > max_distance_tocore) {
                continue;
            }
            body.evaluate_artifacts();
            const possible = body.prefilter_structures(colony, spoiler_level);
            if (possible) {
                candidates.push(body);
            }
        }
        colonies_candidates.push(candidates);
    }
    for (const planets of permute(colonies_candidates, max_distance)) {
        if (search_counter >= 1000) {
            if (performance.now() - search_begin_time > 120000) {
                interrupted = true;
                break;
            }
            search_counter = 0;
            search_counter_2 += 1;
        }
        search_counter += 1;
        const colony_set = [];
        for (let i = 0; i < planets.length; i += 1) {
            const criteria = JSON.parse(JSON.stringify(colonies[i]));
            criteria.new_colony_id = i;
            const stats = planets[i].get_stats(criteria);
            planets[i].rename_farmingaquaculture(criteria);
            colony_set.push([planets[i], criteria, stats]);
        }
        const economy = calculate_economy(markets, faction_hostilities, colony_set);
        for (const [planet, criteria, stats] of colony_set) {
            const has_corrupted_nanoforge = criteria.structures.heavyindustry?.corrupted_nanoforge
                || criteria.structures.orbitalworks?.corrupted_nanoforge || false;
            const has_pristine_nanoforge = criteria.structures.heavyindustry?.pristine_nanoforge
                || criteria.structures.orbitalworks?.pristine_nanoforge || false;
            if (planet.keywords.includes('habitable') && (has_corrupted_nanoforge || has_pristine_nanoforge)) {
                stats.nanoforge_pollution = 1;
                stats.hazard_rating.add(0.25, HAZARD_NAMES['pollution']
                    + (has_corrupted_nanoforge ? ' (Corrupted nanoforge)' : ' (Pristine nanoforge)'));
            }
            if (criteria.market.player_governed) {
                if (management > 0) {
                    stats.stability.add(management, 'Management bonus');
                } else if (management < 0) {
                    stats.stability.add(management, 'Mismanagement penalty');
                }
            }
            if (criteria.market.free_port && 'lightindustry' in criteria.structures) {
                criteria.structures.lightindustry.makes_drugs = true;
            }
            planet.calculate_accessibility(criteria, stats, economy);
            planet.calculate_demand(criteria, stats);
            stats.products = {};
        }
        const infaction_supply = {};
        var availability_changed;
        var limit = 0;
        do {
            for (const [planet, criteria, stats] of colony_set) {
                availability_changed = planet.calculate_production(criteria, stats,
                    economy.crossfaction_supply, infaction_supply);
            }
            limit += 1;
        } while (availability_changed && limit < 100);
        var i = 0;
        for (const [planet, criteria, stats] of colony_set) {
            planet.calculate_commodity_pool(stats, economy.crossfaction_supply, infaction_supply);
            planet.calculate_stats(criteria, stats, spoiler_level);
            for (const commodity in stats.products) {
                const accessibility = Math.round(100 * stats.accessibility.value()) / 100;
                const port_cap = Math.max(0, Math.floor(10 * accessibility));
                const exportable = Math.min(port_cap, stats.products[commodity] ?? 0);
                const amp = exportable * accessibility;
                economy.total_amp[commodity] = (economy.total_amp[commodity] ?? 0) + amp;
                economy.market_amps[commodity].push({ 'market_id': '__player_market_' + i, 'amp': amp }) ;
            }
            i += 1;
        }
        calculate_quality_bonuses(colony_set);
        let combo_profit = 0;
        const combo_stats = [];
        calculate_market_shares(economy);
        for (const [planet, criteria, stats] of colony_set) {
            planet.calculate_profit(criteria, stats, economy);
            if (!criteria.market.player_governed && !criteria.market.hypercognition) {
                if (criteria.market.industrial_planning) {
                    stats.profit.add(-20000, 'Administrator salary');
                } else {
                    stats.profit.add(-2500, 'Administrator salary');
                }
            }
            combo_profit += stats.profit.value();
            combo_stats.push(stats);
        }
        if (combo_profit > least_profit) {
            combos.push([combo_profit, planets, combo_stats]);
        }
        if (combos.length >= 200) {
            combos.sort((a, b) => -(a[0] - b[0]));
            combos.splice(100, combos.length - 100);
            least_profit = combos[combos.length - 1][0];
        }
    }
    console.log('Considered', search_counter_2 * 1000 + search_counter, 'combinations in', performance.now() - search_begin_time, 'ms', interrupted);
    if (combos.length > 100) {
        combos.splice(100, combos.length - 100);
    }
    combos.sort((a, b) => -(a[0] - b[0]));
    return [combos, interrupted];
} // }}}

handle_hash_criteria();
