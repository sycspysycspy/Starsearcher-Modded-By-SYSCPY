const ID_TO_STRUCTURE = {
    'P': 'population', 'S': 'spaceport', 'SS': 'megaport', 'W': 'waystation', 'A': 'farmingaquaculture',
    'M': 'mining', 'T': 'techmining', 'R': 'refining', 'L': 'lightindustry', 'H': 'heavyindustry',
    'HH': 'orbitalworks', 'F': 'fuelprod', 'C': 'commerce', 'O': 'orbitalstation', 'OO': 'battlestation',
    'OOO': 'starfortress', 'G': 'grounddefenses', 'GG': 'heavybatteries', 'Q': 'patrolhq', 'QQ': 'militarybase',
    'QQQ': 'highcommand', 'E': 'planetaryshield', 'Y': 'cryorevival'
};
const STRUCTURE_TO_ID = Object.fromEntries(Object.entries(ID_TO_STRUCTURE).map(pair => [pair[1], pair[0]]));
var starmap = {};

function locnum(num, digits) { // {{{
    return num.toLocaleString(undefined, {
        'minimumFractionDigits': digits,
        'maximumFractionDigits': digits,
    });
} // }}}

function fit_dialog(dialog) { // {{{
    const padding = 0.025 * window.innerHeight;
    const padded_height = (window.innerHeight - 2 * padding);
    const height_diff = padded_height - dialog.clientHeight;
    if (height_diff >= 0) {
        dialog.style.removeProperty('transform');
        return 1;
    }
    const height_ratio = padded_height / dialog.clientHeight;
    const transforms = [
        'translateY(' + (padding + height_diff / 2) + 'px)',
        'scale(' + (height_ratio * 100) + '%)',
    ];
    dialog.style.setProperty('transform', transforms.join(' '));
    return height_ratio;
} // }}}

function open_choose_structures(evt) { // {{{
    const section = evt.target.closest('[data-colony]');
    const existing = new Set();
    var industry_count = 0;
    var structure_count = 1;
    section.querySelectorAll('li.structure').forEach(ele => existing.add(ele.dataset.structure));
    document.querySelectorAll('#choose_structures_dialog li.structure').forEach(function (item) {
        if (existing.has(item.dataset.structure)) {
            item.classList.add('selected');
            structure_count += 1;
            if (item.classList.contains('industry')) {
                industry_count += 1;
            }
        } else {
            item.classList.remove('selected');
        }
    });
    const dialog = document.getElementById('choose_structures_dialog');
    dialog.dataset.colony = section.dataset.colony;
    dialog.querySelector('span.structure_count').innerHTML = structure_count;
    dialog.querySelector('span.industry_count').innerHTML = industry_count;
    const coronal_portal = section.querySelector('li[data-artifact="coronal_portal"]');
    dialog.querySelector('span.max_industries').textContent = coronal_portal ? '5' : '4';
    document.getElementById('modal').dataset.open = "choose_structures";
    fit_dialog(dialog);
} // }}}

function accept_choose_structures(evt) { // {{{
    const colony = evt.target.closest('[data-colony]').dataset.colony;
    const existing_ul = document.querySelector('section[data-colony="' + colony + '"] ul.structures');
    const new_list = document.createDocumentFragment();
    new_list.append(existing_ul.children[0]);
    document.querySelectorAll('#choose_structures_dialog li.structure.selected').forEach(function (item) {
        const old_li = existing_ul.querySelector('[data-structure="' + item.dataset.structure + '"]');
        if (old_li) {
            new_list.append(old_li);
        } else {
            const new_li = item.cloneNode(true);
            delete new_li.dataset.group;
            new_li.classList.remove('selected');
            new_li.addEventListener('click', open_configure_structure);
            new_list.append(new_li);
        }
    });
    existing_ul.replaceChildren(new_list);
    close_modal();
} // }}}

function open_configure_structure(evt) { // {{{
    const colony = evt.target.closest('[data-colony]').dataset.colony;
    const search_structure = evt.target.closest('[data-structure]');
    const dialog = document.getElementById('configure_structure_dialog');
    if (search_structure.dataset.structure == 'farmingaquaculture') {
        var structure_name = 'Farming/Aquaculture';
        var improvement_desc = INDUSTRIES.farming.improvement_desc;
        var alpha_desc = INDUSTRIES.farming.alpha_desc;
    } else {
        var structure_name = INDUSTRIES[search_structure.dataset.structure].name;
        var improvement_desc = INDUSTRIES[search_structure.dataset.structure].improvement_desc;
        var alpha_desc = INDUSTRIES[search_structure.dataset.structure].alpha_desc;
    }
    dialog.querySelector('span.name').innerHTML = structure_name;
    dialog.querySelector('input.improvements').parentNode.querySelector('div.label').setAttribute('title', improvement_desc);
    dialog.querySelector('input[data-aicore="3"]').parentNode.querySelector('div.label').setAttribute('title',
        dialog.querySelector('input[data-aicore="2"]').parentNode.querySelector('div.label').getAttribute('title')
        + ', ' + alpha_desc);
    dialog.querySelector('input.improvements').checked = (search_structure.dataset.improvements == 'true');
    dialog.querySelectorAll('input[name="aicore"]').forEach(function (radio) {
        radio.classList.remove('selected')
        radio.checked = false;
    });
    if (search_structure.dataset.aicore) {
        const radio = dialog.querySelector('input[data-aicore="' + search_structure.dataset.aicore + '"]');
        radio.checked = true;
        radio.classList.add('selected');
    }
    dialog.querySelectorAll('input[name="artifact"]').forEach(function (radio) {
        radio.classList.remove('selected')
        radio.checked = false;
    });
    if (search_structure.dataset.artifact) {
        const radio = dialog.querySelector('input[data-artifact="' + search_structure.dataset.artifact + '"]');
        radio.checked = true;
        radio.classList.add('selected');
    }
    dialog.dataset.colony = colony;
    dialog.dataset.structure = search_structure.dataset.structure;
    document.getElementById('modal').dataset.open = 'configure_structure';
    fit_dialog(dialog);
} // }}}

function accept_configure_structure(evt) { // {{{
    const dialog = evt.target.closest('.dialog');
    const colony = dialog.dataset.colony;
    const dialog_structure = dialog.closest('[data-structure]').dataset.structure;
    const section = document.querySelector('section[data-colony="' + colony + '"]');
    const search_structure = section.querySelector('li[data-structure="' + dialog_structure + '"]');
    search_structure.dataset.improvements = dialog.querySelector('input.improvements').checked;
    const checked_aicore = dialog.querySelector('input[data-aicore]:checked');
    if (checked_aicore) {
        search_structure.dataset.aicore = checked_aicore.dataset.aicore;
    } else {
        delete search_structure.dataset.aicore;
    }
    const checked_artifact = dialog.querySelector('input[data-artifact]:checked');
    if (checked_artifact) {
        search_structure.dataset.artifact = checked_artifact.dataset.artifact;
    } else {
        delete search_structure.dataset.artifact;
    }
    close_modal();
} // }}}

function toggle_structure(evt) { // {{{
    const dialog = document.getElementById('choose_structures_dialog');
    var industry_count = Number(dialog.querySelector('span.industry_count').innerHTML);
    const max_industries = Number(dialog.querySelector('span.max_industries').textContent);
    var structure_count = Number(dialog.querySelector('span.structure_count').innerHTML);
    const structure = evt.target.closest('[data-structure]');
    if (structure.classList.contains('selected')) {
        structure.classList.remove('selected');
        structure_count -= 1;
        if (structure.classList.contains('industry')) {
            industry_count -= 1;
        }
    } else {
        const previous_member = structure.parentNode.querySelector('li.structure.selected[data-group="' + structure.dataset.group + '"]');
        const previous_is_industry = (previous_member && previous_member.classList.contains('industry'));
        if (structure_count >= 12 && !previous_member) {
            alert('Structure limit reached.');
        } else if (structure.classList.contains('industry') && industry_count >= max_industries && !previous_is_industry) {
            alert('Industry limit reached.');
        } else {
            if (previous_member) {
                previous_member.classList.remove('selected');
                structure_count -= 1;
                if (previous_is_industry) {
                    industry_count -= 1;
                }
            }
            structure.classList.add('selected');
            structure_count += 1;
            if (structure.classList.contains('industry')) {
                industry_count += 1;
            }
        }
    }
    dialog.querySelector('span.structure_count').innerHTML = structure_count;
    dialog.querySelector('span.industry_count').innerHTML = industry_count;
} // }}}

function close_modal(evt) { // {{{
    delete document.getElementById('modal').dataset.open;
} // }}}

function handle_clearable_radio_click(evt) { // {{{
    const radio = evt.target;
    const dialog = radio.closest('div.dialog');
    if (radio.classList.contains('selected')) {
        radio.checked = false;
        radio.classList.remove('selected');
    } else {
        dialog.querySelectorAll('input[name="' + radio.name + '"]').forEach(ele => ele.classList.remove('selected'));
        radio.classList.add('selected');
    }
} // }}}

function build_starmap_tooltip(tooltip, coords) {
    const [x, y] = JSON.parse(coords)
    const canvas = arrow_on_starmap(Number(x), Number(y));
    tooltip.appendChild(canvas);
}

function build_conditions_tooltip(tooltip, conditions_json) { // {{{
    const conditions = JSON.parse(conditions_json);
    const icons = [];
    if (conditions.decivilization) {
        icons.push('decivilized');
    }
    if (conditions.pollution || conditions.nanoforge_pollution) {
        icons.push('pollution');
    }
    if (conditions.solar_food) {
        icons.push('solar_array');
    }
    if (conditions.tech >= 1) {
        icons.push([
            'ruins_scattered',
            'ruins_widespread',
            'ruins_extensive',
            'ruins_vast'][conditions.tech - 1]);
    }
    if (conditions.farming == 1) {
        icons.push([
            'farmland_poor',
            'farmland_adequate',
            'farmland_rich',
            'farmland_bountiful'][conditions.food + 1]);
    }
    if (conditions.rare_ore >= -1) {
        icons.push([
            'rareore_sparse',
            'rareore_moderate',
            'rareore_abundant',
            'rareore_rich',
            'rareore_ultrarich'][conditions.rare_ore + 1]);
    }
    if (conditions.ore >= -1) {
        icons.push([
            'ore_sparse',
            'ore_moderate',
            'ore_abundant',
            'ore_rich',
            'ore_ultrarich'][conditions.ore + 1]);
    }
    if (conditions.volatiles >= -1) {
        icons.push([
            'volatiles_trace',
            'volatiles_diffuse',
            'volatiles_abundant',
            'volatiles_plentiful'][conditions.volatiles + 1]);
    }
    if (conditions.organics >= -1) {
        icons.push([
            'organics_trace',
            'organics_common',
            'organics_abundant',
            'organics_plentiful'][conditions.organics + 1]);
    }
    if (conditions.meteor_impacts) {
        icons.push('meteor_impacts');
    }
    if (conditions.light < 2) {
        icons.push([
            'darkness',
            'poor_light'][conditions.light]);
    }
    if (conditions.water) {
        icons.push('water_covered');
    }
    if (conditions.biosphere) {
        icons.push('inimical_biosphere');
    }
    if (conditions.radiation) {
        icons.push('irradiated');
    }
    if (conditions.weather === 0) {
        icons.push('climate_mild');
    } else if (conditions.weather == 2) {
        icons.push('weather_extreme');
    }
    if (conditions.atmosphere <= 1) {
        icons.push([
            'atmosphere_none',
            'atmosphere_thin'][conditions.atmosphere]);
    } else if (conditions.atmosphere >= 3) {
        icons.push([
            'atmosphere_dense',
            'atmosphere_toxic'][conditions.atmosphere - 3]);
    }
    if (conditions.tectonics >= 1) {
        icons.push([
            'tectonic',
            'tectonic_extreme'][conditions.tectonics - 1]);
    }
    if (conditions.temperature <= 1) {
        icons.push([
            'cold_extreme',
            'cold'][conditions.temperature]);
    } else if (conditions.temperature + conditions.lamp_heat >= 3) {
        icons.push([
            'hot',
            'hot_extreme'][conditions.temperature + conditions.lamp_heat - 3]);
    }
    if (conditions.gravity === 0) {
        icons.push('gravity_low');
    } else if (conditions.gravity == 2) {
        icons.push('gravity_high');
    }
    if (conditions.habitable) {
        icons.push('habitable');
    }
    const ul = document.createElement('ul');
    ul.classList.add('conditions');
    ul.classList.add('type-' + conditions.type);
    for (const icon of icons) {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.setAttribute('src', 'images/conditions/' + icon + '.png');
        li.appendChild(img);
        ul.appendChild(li);
    }
    tooltip.appendChild(ul);
} // }}}

function build_breakdown_toolip(tooltip, breakdown) { // {{{
    const [unit, addends, multipliers] = JSON.parse(breakdown);
    const table = document.createElement('table');
    for (const addend of addends) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add('stat');
        td1.classList.add('numeric');
        if (addend.value < 0) {
            td1.classList.add('negative');
        }
        td1.textContent = (addend.value < 0 ? '' : '+') + locnum((unit == '%' ? 100 : 1) * addend.value, 0) + unit;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.textContent = addend.label;
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    for (const multiplier of multipliers) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add('stat');
        td1.classList.add('numeric');
        if (multiplier.value < 1) {
            td1.classList.add('negative');
        }
        td1.textContent = '×' + locnum(multiplier.value, 2);
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.textContent = multiplier.label;
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    tooltip.appendChild(table);
    alternate_a(tooltip);
} // }}}

function build_products_toolip(tooltip, products_json) { // {{{
    const products = JSON.parse(products_json);
    const table = document.createElement('table');
    for (const commodity in products) {
        const quantity = products[commodity];
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add('stat');
        td1.classList.add('numeric');
        td1.textContent = quantity;
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.textContent = COMMODITIES[commodity].name;
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    tooltip.appendChild(table);
    alternate_a(tooltip);
} // }}}

function build_demands_toolip(tooltip, commodities_json) { // {{{
    const commodities = JSON.parse(commodities_json);
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = 'Infac';
    tr.appendChild(td1);
    const td2 = document.createElement('td');
    td2.textContent = 'Xfac';
    tr.appendChild(td2);
    const td3 = document.createElement('td');
    td3.textContent = 'Short';
    tr.appendChild(td3);
    const td4 = document.createElement('td');
    td4.textContent = 'Commodity';
    tr.appendChild(td4);
    table.appendChild(tr);
    var total_infac = 0;
    var total_imported = 0;
    var total_shortage = 0;
    function append_row(table, row) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.classList.add('stat');
        td1.classList.add('numeric');
        td1.textContent = row[0] || '';
        tr.appendChild(td1);
        const td2 = document.createElement('td');
        td2.classList.add('stat');
        td2.classList.add('numeric');
        td2.textContent = row[1] || '';
        tr.appendChild(td2);
        const td3 = document.createElement('td');
        td3.classList.add('stat');
        td3.classList.add('numeric');
        td3.textContent = row[2] || '';
        tr.appendChild(td3);
        const td4 = document.createElement('td');
        td4.textContent = row[3];
        tr.appendChild(td4);
        table.appendChild(tr);
    }
    const rows = [];
    for (const commodity_id in commodities) {
        const commodity = commodities[commodity_id];
        if (!commodity.demanded) continue;
        rows.push([commodity.used_local + commodity.imported_infaction, commodity.imported_crossfaction, commodity.shortage,
            COMMODITIES[commodity_id].name, commodity_id, commodity.produced]);
        total_infac += commodity.used_local + commodity.imported_infaction;
        total_imported += commodity.imported_crossfaction;
        total_shortage += commodity.shortage;
    }
    rows.sort(function(a, b) {
        const produced_before_not_produced = -(!!a[5] - !!b[5]);
        const both_produced = (a[5] && b[5]);
        const not_imported_before_imported = ((a[0] > a[5] || a[1]) - (b[0] > b[5] || b[1]));
        const lower_tiers_first = (COMMODITIES[a[4]].tier - COMMODITIES[b[4]].tier);
        return produced_before_not_produced || (both_produced ? not_imported_before_imported : 0) || lower_tiers_first;
    });
    for (const row of rows) {
        append_row(table, row);
    }
    append_row(table, [total_infac, total_imported, total_shortage, 'TOTAL']);
    tooltip.appendChild(table);
    alternate_a(tooltip);
} // }}}

function build_planet_sets(planet_sets, interrupted) { // {{{
    const dialog = document.querySelector('div#planet_sets_dialog');
    if (interrupted) {
        dialog.querySelector('div.timed_out').style.setProperty('display', 'block');
    } else {
        dialog.querySelector('div.timed_out').style.removeProperty('display');
    }
    const row_template = dialog.querySelector('table.template tr.planet');
    const sum_template = dialog.querySelector('table.template tr.overall');
    const table_body = dialog.querySelector('table.planet_sets tbody');
    while (table_body.firstChild) {
        table_body.removeChild(table_body.firstChild);
    }
    for (const [profit, planets, stats] of planet_sets) {
        var set_income = 0;
        var set_upkeep = 0;
        var set_profit = 0;
        for (let i = 0; i < planets.length; i += 1) {
            const row_clone = row_template.cloneNode(true);
            const tds = row_clone.querySelectorAll('td');
            tds[0].textContent = planets[i].system.name;
            tds[1].innerHTML = locnum(planets[i].system.r / UNITS_PER_LIGHTYEAR, 1) + ' ly <span class="arrow"'
                + ' style="--angle: ' + (planets[i].system.theta / Math.PI * 180) + 'deg">➙</span>';
            tds[1].dataset.coords = JSON.stringify([planets[i].system.x, planets[i].system.y]);
            tds[2].textContent = planets[i].name;
            tds[3].textContent = BODY_TYPES[planets[i].type];
            tds[3].classList.add('type-' + planets[i].type);
            tds[3].dataset.conditions = JSON.stringify({ 'habitable': planets[i].keywords.includes('habitable'),
                'nanoforge_pollution': stats[i].nanoforge_pollution,
                'lamp_heat': stats[i].lamp_heat,
                'type': planets[i].type, ...planets[i].conditions});
            const clamped_stability = Math.min(Math.max(stats[i].stability.value(), 0), 10);
            tds[4].textContent = clamped_stability;
            tds[4].dataset.breakdown = JSON.stringify(['', stats[i].stability.addends, stats[i].stability.multipliers])
            tds[5].textContent = locnum(100 * stats[i].accessibility.value(), 0) + '%';
            tds[5].dataset.breakdown = JSON.stringify(['%', stats[i].accessibility.addends, stats[i].accessibility.multipliers])
            tds[6].textContent = locnum(100 * stats[i].fleet_size.value(), 0) + '%';
            tds[6].dataset.breakdown = JSON.stringify(['%', stats[i].fleet_size.addends, stats[i].fleet_size.multipliers])
            tds[7].textContent = locnum(100 * stats[i].ship_quality.value(), 0) + '%';
            tds[7].dataset.breakdown = JSON.stringify(['%', stats[i].ship_quality.addends, stats[i].ship_quality.multipliers])
            tds[8].textContent = locnum(stats[i].ground_forces.value(), 0);
            tds[8].dataset.breakdown = JSON.stringify(['', stats[i].ground_forces.addends, stats[i].ground_forces.multipliers])
            tds[9].textContent = locnum(100 * stats[i].hazard_rating.value(), 0) + '%';
            tds[9].dataset.breakdown = JSON.stringify(['%', stats[i].hazard_rating.addends, stats[i].hazard_rating.multipliers])
            tds[10].innerHTML = '&#x1D32E';
            tds[10].dataset.products = JSON.stringify(stats[i].products);
            tds[11].innerHTML = '&#x1D32E';
            tds[11].dataset.demands = JSON.stringify(stats[i].commodities);
            tds[12].textContent = locnum(stats[i].income.value(), 0);
            tds[12].dataset.breakdown = JSON.stringify(['', stats[i].income.addends, stats[i].income.multipliers]);
            tds[13].textContent = locnum(stats[i].upkeep.value(), 0);
            tds[13].dataset.breakdown = JSON.stringify(['', stats[i].upkeep.addends, stats[i].upkeep.multipliers]);
            tds[14].textContent = locnum(stats[i].profit.value(), 0);
            tds[14].dataset.breakdown = JSON.stringify(['', stats[i].profit.addends, stats[i].profit.multipliers]);
			if(planets[i].core_techMiningMult != -1){
				if(String(planets[i].ruin_explored == 'ture')){
					tds[15].textContent = locnum(100 * planets[i].core_techMiningMult, 2) + '%';
				}else{
					tds[15].textContent = '<b>' + locnum(100 * planets[i].core_techMiningMult, 2) + '%</b>';
				}
			}else if(String(planets[i].ruin_explored) == 'true'){
				tds[15].textContent = '100%';
			}else if(String(planets[i].ruin_explored) == 'false'){
				tds[15].textContent = '<b>' + '100%' + '</b>';
			}else{
				tds[15].textContent = '-';
			}
			tds[16].textContent = (planets[i].gate) ? '\u2713' : '\u274C';
			tds[17].textContent = (planets[i].domain_relay) ? '\u2713': '\u274C';
            table_body.appendChild(row_clone);
            set_income += stats[i].income.value();
            set_upkeep += stats[i].upkeep.value();
            set_profit += stats[i].profit.value();
        }
        if (planets.length > 1) {
            const sum_clone = sum_template.cloneNode(true);
            const tds = sum_clone.querySelectorAll('td');
            tds[3].textContent = locnum(set_income, 0);
            tds[4].textContent = locnum(set_upkeep, 0);
            tds[5].textContent = locnum(set_profit, 0);
            table_body.appendChild(sum_clone);
        }
    }
    table_body.querySelectorAll('td[data-coords]').forEach(td => td.addEventListener('mouseenter', function (evt) {
        const tooltip = document.getElementById('tooltip');
        while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
        }
        build_starmap_tooltip(tooltip, evt.target.dataset.coords);
        position_tooltip(evt, tooltip);
        tooltip.style.opacity = '1';
    }));
    table_body.querySelectorAll('td[data-conditions]').forEach(td => td.addEventListener('mouseenter', function (evt) {
        const tooltip = document.getElementById('tooltip');
        while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
        }
        build_conditions_tooltip(tooltip, evt.target.dataset.conditions);
        position_tooltip(evt, tooltip);
        tooltip.style.opacity = '1';
    }));
    table_body.querySelectorAll('td[data-breakdown]').forEach(td => td.addEventListener('mouseenter', function (evt) {
        const tooltip = document.getElementById('tooltip');
        while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
        }
        build_breakdown_toolip(tooltip, evt.target.dataset.breakdown);
        position_tooltip(evt, tooltip);
        tooltip.style.opacity = '1';
    }));
    table_body.querySelectorAll('td[data-products]').forEach(td => td.addEventListener('mouseenter', function (evt) {
        const tooltip = document.getElementById('tooltip');
        while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
        }
        build_products_toolip(tooltip, evt.target.dataset.products);
        position_tooltip(evt, tooltip);
        tooltip.style.opacity = '1';
    }));
    table_body.querySelectorAll('td[data-demands]').forEach(td => td.addEventListener('mouseenter', function (evt) {
        const tooltip = document.getElementById('tooltip');
        while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
        }
        build_demands_toolip(tooltip, evt.target.dataset.demands);
        position_tooltip(evt, tooltip);
        tooltip.style.opacity = '1';
    }));
    table_body.querySelectorAll('td:is([data-coords],[data-conditions],[data-breakdown],[data-products],[data-demands])').forEach(td => td.addEventListener('mouseout', function (evt) {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.opacity = '0';
    }));
    table_body.querySelectorAll('td:is([data-coords],[data-conditions],[data-breakdown],[data-products],[data-demands])').forEach(td => td.addEventListener('mousemove', function (evt) {
        const tooltip = document.getElementById('tooltip');
        position_tooltip(evt, tooltip);
    }));
    alternate_a(table_body);
} // }}}

function position_tooltip(evt, tooltip) { // {{{
    const spillX = (evt.clientX + tooltip.offsetWidth) - document.body.clientWidth;
    const spillY = (16 + evt.clientY + tooltip.offsetHeight) - window.innerHeight;
    const left = (evt.clientX) - (spillX > 0 ? tooltip.offsetWidth : 0);
    const top_ = (16 + evt.clientY) - (spillY > 0 ? (tooltip.offsetHeight + 32) : 0);
    tooltip.style.left = left + 'px';
    tooltip.style.top = top_ + 'px';
} // }}}

function initialize_starmap(systems) { // {{{
    let max_x = 0;
    let max_y = 0;
    for (const system_id in systems) {
        max_x = Math.max(max_x, Math.abs(systems[system_id].x));
        max_y = Math.max(max_y, Math.abs(systems[system_id].y));
    }
    max_x = UNITS_PER_LIGHTYEAR * Math.ceil(max_x / UNITS_PER_LIGHTYEAR) + UNITS_PER_LIGHTYEAR;
    max_y = UNITS_PER_LIGHTYEAR * Math.ceil(max_y / UNITS_PER_LIGHTYEAR) + UNITS_PER_LIGHTYEAR;
    const canvas = document.createElement('canvas');
    const units_per_pixel = (UNITS_PER_LIGHTYEAR / 10) / window.devicePixelRatio;
    canvas.width = max_x * 2 / units_per_pixel;
    canvas.height = max_y * 2 / units_per_pixel;
    canvas.style.setProperty('width', (canvas.width / window.devicePixelRatio) + 'px');
    canvas.style.setProperty('height', (canvas.height / window.devicePixelRatio) + 'px');
    const context = canvas.getContext('2d');
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    const max_d = Math.max(max_x, max_y);
    for (let d = -max_d; d <= max_d; d += UNITS_PER_LIGHTYEAR) {
        if (d % (3 * UNITS_PER_LIGHTYEAR) == 0) {
            context.fillStyle = 'rgba(255, 255, 255, 0.12)';
        } else {
            context.fillStyle = 'rgba(255, 255, 255, 0.06)';
        }
        context.fillRect((max_x + d) / units_per_pixel, 0, window.devicePixelRatio, 2 * max_y / units_per_pixel);
        context.fillRect(0, (max_y + d) / units_per_pixel, 2 * max_x / units_per_pixel, window.devicePixelRatio);
    }
    context.lineWidth = 2 * window.devicePixelRatio;
    for (const system_id in systems) {
        const system = systems[system_id];
        for (const star of system.stars) {
            const x = (max_x + star.x) / units_per_pixel;
            const y = canvas.height - (max_y + star.y) / units_per_pixel;
            if (!star.type.startsWith('nebula_')) {
                context.fillStyle = BODY_COLORS[star.type];
                context.beginPath();
                context.arc(x, y, window.devicePixelRatio * Math.max(star.radius / 3 / units_per_pixel, 1), 0, 2 * Math.PI)
                context.fill();
            } else {
                context.strokeStyle = BODY_COLORS[star.type];
                context.beginPath();
                context.arc(x, y, window.devicePixelRatio * 4, 0, 2 * Math.PI)
                context.stroke();
            }
        }
    }
    return {
        canvas,
        units_per_pixel,
        max_x,
        max_y,
    }
} // }}}

function arrow_on_starmap(x, y) {
    console.log(x, y);
    const theta = 0 - Math.atan2(y, x);
    const dpr = window.devicePixelRatio;
    const canvas = starmap.canvas.cloneNode(true);
    const context = canvas.getContext('2d');
    context.drawImage(starmap.canvas, 0, 0);
    context.fillStyle = '#00ff00';
    context.translate((starmap.max_x + x) / starmap.units_per_pixel, (starmap.max_y - y) / starmap.units_per_pixel);
    context.rotate(theta);
    context.beginPath();
    context.moveTo(-2 * dpr, 0 * dpr);
    context.lineTo(-12 * dpr, 7 * dpr);
    context.lineTo(-12 * dpr, 2.5 * dpr);
    context.lineTo(-22 * dpr, 2.5 * dpr);
    context.lineTo(-22 * dpr, -2.5 * dpr);
    context.lineTo(-12 * dpr, -2.5 * dpr);
    context.lineTo(-12 * dpr, -7 * dpr);
    context.lineTo(-2 * dpr, 0 * dpr);
    context.fill();
    document.querySelector('body').appendChild(canvas);
    return canvas;
}

function read_file(save_file) { // {{{
    const status_div = document.querySelector('div.file_status div.status');
    status_div.textContent = 'Loading...';
    alternate_a(status_div);
    const reader = new FileReader();
    reader.onload = function(evt) {
        status_div.textContent = 'Parsing...';
        alternate_a(status_div);
        window.setTimeout(function() {
            let parse_error = false;
            try {
                parse_xml(evt.target.result);
            } catch (error) {
                parse_error = error;
            }
            if (parse_error) {
                status_div.innerHTML = 'Parsing failed. See <a href="#help">help</a> for details.';
                const error_json = JSON.stringify(parse_error, Object.getOwnPropertyNames(parse_error));
                const textarea = document.getElementById('parse_error');
                textarea.textContent = error_json;
                textarea.classList.add('visible');
            } else {
                find_neighbors(systems);
                consider_other_factors(systems);
                starmap = initialize_starmap(systems);
                const character_data = get_named_child(xml.children[0], 'characterData');
                const player_name = get_named_child(character_data, 'name').textContent;
                status_div.textContent = 'Hello, ' + player_name + '!';
            }
            alternate_a(status_div);
        }, 17);
    };
    reader.readAsText(save_file);
} // }}}

function handle_file_input_change(evt) { // {{{
    const save_file = evt.target.files[0];
    if (typeof save_file === 'undefined') {
        return false;
    }
    read_file(save_file);
} // }}}

function count_admin_governed() { // {{{
    let admin_governed = 0;
    for (const section of document.querySelectorAll('section[data-colony]:not(.template)')) {
        if (section.querySelector('input.player_governed:not(:checked)')
                && section.querySelector('input.hypercognition:not(:checked)')) {
            admin_governed += 1;
        }
    }
    return admin_governed;
} // }}}

function search_planets(evt) { // {{{
    if (Object.keys(bodies).length == 0) {
        alert('Please select your save file first.');
    } else if (count_admin_governed() > 3) {
        alert('The game will not permit you to hire more than 3 administrators. Please select Player-Governed or Hypercognition on more of your colonies.');
    } else {
        document.getElementById('modal').dataset.open = 'searching';
        window.setTimeout(function() {
            const colonies = [];
            document.querySelectorAll('section[data-colony]:not(.template)').forEach(function (section) {
                colonies.push(get_colony_criteria(section));
            });
            const max_distance = Number(document.querySelector('select[name="max_distance"]').value) * UNITS_PER_LIGHTYEAR;
			const max_distance_tocore = Number(document.querySelector('select[name="max_distance_tocore"]').value) * UNITS_PER_LIGHTYEAR;
            const spoiler_level = Number(document.querySelector('select[name="spoiler_level"]').value);
            const [planet_sets, interrupted] = evaluate_planet_sets(colonies, max_distance, max_distance_tocore, spoiler_level);
            build_planet_sets(planet_sets, interrupted);
            document.getElementById('modal').dataset.open = 'planet_sets';
            fit_dialog(document.getElementById('planet_sets_dialog'));
            document.querySelector('div.table_constraint').scrollTop = 0;
        }, 17);
    }
} // }}}

function populate_save_slots(dialog) { // {{{
    const presets_json = window.localStorage.getItem('presets');
    const presets = (presets_json ? JSON.parse(presets_json) : {'version': undefined, 'slots': []});
    const radios = dialog.querySelectorAll('input[name="slot"]');
    if (presets.version == 1) {
        for (let s = 0; s < 8; s += 1) {
            let name = 'Empty';
            if (presets.slots[s]) {
                name = presets.slots[s].name;
            }
            radios[s].parentNode.querySelector('div.label').textContent = '' + s + ': ' + name;
            radios[s].checked = false;
        }
    }
} // }}}

function fill_preset_name(evt) { // {{{
    const label = evt.target.closest('.toggle_container').querySelector('div.label').textContent;
    const name = label.substring(label.indexOf(': ') + 2);
    document.querySelector('#save_load_criteria_dialog input[name="preset_name"]').value = (name == 'Empty' ? '' : name);
} // }}}

function handle_slot_click(evt) { // {{{
    const dialog = document.getElementById('save_load_criteria_dialog');
    const mode = dialog.dataset.mode;
    if (mode == 'save') {
        fill_preset_name(evt);
    } else if (mode == 'load') {
        load_criteria(evt);
    }
} // }}}

function save_criteria(evt) { // {{{
    const colony_id = evt.target.closest('[data-colony]').dataset.colony;
    const dialog = document.getElementById('save_load_criteria_dialog');
    const presets_json = window.localStorage.getItem('presets');
    const presets = (presets_json ? JSON.parse(presets_json) : {'version': 1, 'slots': []});
    if (presets.version == 1) {
        const slot = dialog.querySelector('input[name="slot"]:checked');
        if (slot) {
            var name = dialog.querySelector('input[name="preset_name"]').value;
            if (name === '') name = '(no name)';
            const colony = document.querySelector('section[data-colony="' + colony_id + '"]');
            presets.slots[Number(slot.value)] = { name, 'criteria': get_colony_criteria(colony) };
            window.localStorage.setItem('presets', JSON.stringify(presets));
            close_modal();
        } else {
            alert('Please choose a slot.');
        }
    }
} // }}}

function open_save_criteria(evt) { // {{{
    const colony = evt.target.closest('[data-colony]');
    const dialog = document.getElementById('save_load_criteria_dialog');
    dialog.dataset.colony = colony.dataset.colony;
    dialog.dataset.mode = 'save';
    populate_save_slots(dialog);
    dialog.querySelector('input[name="preset_name"]').value = '';
    dialog.querySelector('span.action').textContent = 'Save';
    document.getElementById('modal').dataset.open = 'save_load_criteria';
    fit_dialog(dialog);
} // }}}

function load_criteria(evt) { // {{{
    const colony_id = evt.target.closest('[data-colony]').dataset.colony;
    const dialog = document.getElementById('save_load_criteria_dialog');
    const presets_json = window.localStorage.getItem('presets');
    const presets = (presets_json ? JSON.parse(presets_json) : {'version': undefined, 'slots': []});
    if (presets.version == 1) {
        const slot = dialog.querySelector('input[name="slot"]:checked');
        if (slot) {
            const colony = document.querySelector('section[data-colony="' + colony_id + '"]');
            const preset = presets.slots[Number(slot.value)];
            if (preset && preset.criteria) {
                set_colony_criteria(colony, preset.criteria);
                close_modal();
            } else {
                alert('This preset slot is empty');
            }
        } else {
            alert('Please choose a slot.');
        }
    } else {
        alert('No valid presets found in browser\'s local storage. (Try saving a preset.)');
    }
} // }}}

function open_load_criteria(evt) { // {{{
    const colony = evt.target.closest('[data-colony]');
    const dialog = document.getElementById('save_load_criteria_dialog');
    dialog.dataset.colony = colony.dataset.colony;
    dialog.dataset.mode = 'load';
    populate_save_slots(dialog);
    dialog.querySelector('span.action').textContent = 'Load';
    document.getElementById('modal').dataset.open = 'save_load_criteria';
    fit_dialog(dialog);
} // }}}

function init_colony_handlers(section) { // {{{
    section.querySelector('button.save_criteria').addEventListener('click', open_save_criteria);
    section.querySelector('button.load_criteria').addEventListener('click', open_load_criteria);
    section.querySelector('button.delete_colony').addEventListener('click', handle_delete_colony);
    section.querySelectorAll('ul.structures li[data-structure] div.images').forEach(button =>
            button.addEventListener('click', open_configure_structure));
    section.querySelector('button.choose_structures').addEventListener('click', open_choose_structures);
    section.querySelectorAll('input.player_governed').forEach(input => input.addEventListener('click', function(evt) {
        if (evt.target.checked) {
            evt.target.closest('[data-colony]').querySelector('input.hypercognition').checked = false;
        }
    }));
    section.querySelectorAll('input.industrial_planning').forEach(input => input.addEventListener('click', function(evt) {
        if (!evt.target.checked) {
            evt.target.closest('[data-colony]').querySelector('input.hypercognition').checked = false;
        }
    }));
    section.querySelectorAll('input.hypercognition').forEach(input => input.addEventListener('click', function(evt) {
        if (evt.target.checked) {
            evt.target.closest('[data-colony]').querySelector('input.industrial_planning').checked = true;
            evt.target.closest('[data-colony]').querySelector('input.player_governed').checked = false;
        }
    }));
} // }}}

function add_colony(evt) { // {{{
    const existing_colonies = document.querySelectorAll('section[data-colony]:not(.template)').length;
    if (existing_colonies >= 5) {
        alert('You cannot search for more than five colonies.');
        return false;
    }
    const template = document.querySelector('section[data-colony].template');
    const new_colony = template.cloneNode(true);
    new_colony.classList.remove('template');
    init_colony_handlers(new_colony);
    const next = Number(template.dataset.colony) + 1;
    new_colony.querySelector('h3').textContent = 'Colony ' + next;
    template.parentNode.insertBefore(new_colony, template);
    template.dataset.colony = next;
    void new_colony.offsetWidth;
    new_colony.classList.remove('rolled_up');
    return true;
} // }}}

function delete_colony(section) { // {{{
    var later_section = section.nextElementSibling;
    section.dataset.colony = '';
    section.classList.add('rolled_up');
    window.setTimeout(function() {
        section.parentNode.removeChild(section);
    }, 200);
    while (later_section.matches('section[data-colony]')) {
        later_section.querySelector('h3').textContent = 'Colony ' + later_section.dataset.colony;
        later_section.dataset.colony = Number(later_section.dataset.colony) - 1;
        later_section = later_section.nextElementSibling;
    }
} // }}}

function handle_delete_colony(evt) { // {{{
    const existing_colonies = document.querySelectorAll('section[data-colony]:not(.template)').length;
    const section = evt.target.closest('[data-colony]');
    if (existing_colonies <= 1) {
        const template = document.querySelector('section[data-colony].template');
        const is_default = (JSON.stringify(get_colony_criteria(section)) == JSON.stringify(get_colony_criteria(template)));
        if (is_default) {
            alert('You must search for at least one colony.');
            return false;
        } else {
            add_colony();
        }
    }
    delete_colony(section);
    return true;
} // }}}

function walk_text_nodes(el) { // {{{
    const ret = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var node;
    while (node = walk.nextNode()) {
        ret.push(node);
    }
    return ret;
} // }}}

function alternate_a(el) { // {{{
    for (const text_node of walk_text_nodes(el)) {
        if (window.getComputedStyle(text_node.parentNode).getPropertyValue('font-family').includes('Montserrat')
                && window.getComputedStyle(text_node.parentNode).getPropertyValue('font-style') != 'italic') {
            const template = document.createElement('template');
            template.innerHTML = text_node.textContent.replaceAll('a', '<span class="salt">a</span>');
            text_node.parentNode.insertBefore(template.content, text_node);
            text_node.parentNode.removeChild(text_node);
        }
    }
} // }}}

function decode_criterias(crit_str) { // {{{
    const colony_strs = crit_str.split(',');
    //const parameters_str = colony_strs.pop();
    const criterias = [];
    for (const str of colony_strs) {
        const checkbox_str = str.match(/^[01]*/)[0];
        const market = {
            'player_governed': checkbox_str[0] === '1',
            'industrial_planning': checkbox_str[1] === '1',
            'hypercognition': checkbox_str[2] === '1',
            'free_port': checkbox_str[3] === '1',
        };
        const struct_strs = str.matchAll(/([A-Z])\1*[a-z]*/g);
        const structures = {};
        for (const struct_match of struct_strs) {
            const struct_str = struct_match[0];
            const struct_id = struct_str.match(/^[A-Z]+/)[0];
            const struct_key = ID_TO_STRUCTURE[struct_id];
            const artifact_num = struct_str.match(/a+/)?.[0]?.length;
            const artifact = INDUSTRIES[(struct_key == 'farmingaquaculture' ? 'farming' : struct_key)].artifacts?.[artifact_num - 1] || false;
            const aicore = struct_str.match(/c+/)?.[0]?.length || 0;
            const improvements = struct_str.includes('i');
            structures[struct_key] = { artifact, aicore, improvements };
        }
        criterias.push({ market, structures });
    }
    return criterias;
} // }}}

function encode_criterias(criterias) { // {{{
    const crit_str_parts = [];
    for (const criteria of criterias) {
        const colony_str_parts = [
            criteria.market.player_governed ? '1': '0',
            criteria.market.industrial_planning ? '1': '0',
            criteria.market.hypercognition ? '1': '0',
            criteria.market.free_port ? '1': '0',
        ];
        for (const [struct_key, config] of Object.entries(criteria.structures)) {
            colony_str_parts.push(STRUCTURE_TO_ID[struct_key]);
            const artifact_num = config.artifact && INDUSTRIES[(struct_key == 'farmingaquaculture' ? 'farming' : struct_key)].artifacts.indexOf(config.artifact) + 1;
            colony_str_parts.push('a'.repeat(artifact_num));
            colony_str_parts.push('c'.repeat(config.aicore));
            colony_str_parts.push('i'.repeat(config.improvements));
        }
        crit_str_parts.push(colony_str_parts.join(''));
    }
    return crit_str_parts.join(',');
} // }}}

function handle_hash_criteria(evt) { // {{{
    const hash_crit_str = window.location.hash.substring(1);
    if (!hash_crit_str || hash_crit_str == 'help') {
        return false;
    }
    const criterias = decode_criterias(hash_crit_str);
    var sections = document.querySelectorAll('section[data-colony]:not(.template)');
    var existing_colonies = sections.length;
    while (existing_colonies < criterias.length) {
        if (!add_colony()) {
            break;
        }
        existing_colonies += 1;
    }
    sections = document.querySelectorAll('section[data-colony]:not(.template)');
    for (let i = 0; i < sections.length; i += 1) {
        if (criterias[i]) {
            set_colony_criteria(sections[i], criterias[i]);
        } else {
            delete_colony(sections[i]);
        }
    }
} // }}}

function copy_link(evt) { // {{{
    const criterias = [];
    document.querySelectorAll('section[data-colony]:not(.template)').forEach(function (section) {
        criterias.push(get_colony_criteria(section));
    });
    const link = 'https://gomtuu.org/starsearcher/#' + encode_criterias(criterias);
    const copied_url = document.querySelector('span.copied_url');
    copied_url.style.setProperty('animation', '');
    void copied_url.offsetWidth;
    copied_url.style.setProperty('animation', '4s fade cubic-bezier(1, 0, 1, 0) forwards');
    navigator.clipboard.writeText(link);
} // }}}

function handle_doc_keydown (evt) { // {{{
    if (evt.key == 'Escape') {
        close_modal();
        evt.preventDefault();
    }
} // }}}

function handle_input_keyup (evt) { // {{{
    if (evt.key == 'Enter') {
        save_criteria(evt);
        evt.preventDefault();
    }
} // }}}

function handle_drop (evt) { // {{{
    evt.preventDefault();
    for (const item of evt.dataTransfer.items) {
        if (item.kind === 'file') {
            read_file(item.getAsFile());
            break;
        }
    }
} // }}}

document.getElementById('modal').addEventListener('click', close_modal);
document.querySelectorAll('div.dialog').forEach(dialog => dialog.addEventListener('click', evt => evt.stopPropagation()));

document.querySelector('input[type="file"]').addEventListener('change', handle_file_input_change);
document.querySelectorAll('section[data-colony]:not(.template)').forEach(section => init_colony_handlers(section));
document.querySelector('button.add_colony').addEventListener('click', add_colony);
document.querySelector('button.search_planets').addEventListener('click', search_planets);

document.querySelectorAll('#choose_structures_dialog li.structure').forEach(tile => tile.addEventListener('click', toggle_structure));
document.querySelectorAll('div.dialog button.cancel').forEach(button => button.addEventListener('click', close_modal));
document.getElementById('choose_structures_accept').addEventListener('click', accept_choose_structures);

document.getElementById('configure_structure_accept').addEventListener('click', accept_configure_structure);

document.querySelectorAll('input.clearable_radio').forEach(input => input.addEventListener('click', handle_clearable_radio_click));

document.querySelectorAll('input[name="slot"]').forEach(input => input.addEventListener('click', handle_slot_click));
document.querySelector('button.save_preset').addEventListener('click', save_criteria);

document.querySelector('button.link_colonies').addEventListener('click', copy_link);
window.addEventListener('hashchange', handle_hash_criteria);

document.addEventListener('keydown', handle_doc_keydown);
document.querySelector('#save_load_criteria_dialog input[name="preset_name"]').addEventListener('keyup', handle_input_keyup);

document.addEventListener('drop', handle_drop);
document.addEventListener('dragover', evt => evt.preventDefault());

alternate_a(document);
