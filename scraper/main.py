import httpx
from selectolax.parser import HTMLParser
from urllib.parse import urljoin
import json
import time
import re
from tqdm import tqdm
from collections import Counter


base_url = "https://onepiece.fandom.com"
affiliation_set = set()
origin_set = set()
race_set = set()
dftype_set = set()
debut_arc_set = set()
gender_set = set()
bounty_set = set()
haki_set = set()
arcs_set = set()

affiliation_counter = Counter()
origin_counter = Counter()
race_counter = Counter()
dftype_counter = Counter()
debut_arc_counter = Counter()
gender_counter = Counter()
bounty_counter = Counter()
haki_counter = Counter()
arcs_counter = Counter()

haki_set.update(["Busoshoku Haki", "Kenbunshoku Haki", "Haoshoku Haki"])
arcs_set.update(["Romance Dawn",
        "Orange Town",
        "Syrup Village",
        "Baratie",
        "Arlong Park",
        "Loguetown",
        "Reverse Mountain",
        "Whiskey Peak",
        "Little Garden",
        "Drum Island",
        "Alabasta",
        "Jaya",
        "Skypiea",
        "Long Ring Long Land",
        "Water 7",
        "Enies Lobby",
        "Thriller Bark",
        "Sabaody Archipelago",
        "Amazon Lily",
        "Impel Down",
        "Marineford",
        "Post-War",
        "Return to Sabaody",
        "Fish-Man Island",
        "Punk Hazard",
        "Dressrosa",
        "Zou",
        "Whole Cake Island",
        "Reverie",
        "Wano Country",
        "Egghead"])

count = 0

def clean_text(text):   
    """
    Clean the given text by removing references, notations, text within parentheses,
    fixing missing spaces before capital letters, and removing extra spaces.

    Args:
        text (str): The text to be cleaned.

    Returns:
        str: The cleaned text.
        
    """
    # Remove references like [1], [2], etc.
    text = re.sub(r'\[\d+\]', '', text)
    # Remove "former" and similar notations
    text = re.sub(r'\(former\)', '', text, flags=re.IGNORECASE)
    # Remove text within parentheses
    text = re.sub(r'\(.*?\)', '', text)
    # Fix missing spaces before capital letters if preceded by lowercase letters
    text = re.sub(r'([a-z])([A-Z])', r'\1 \2', text)
    # Remove any extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def get_html(baseurl):    
    """
    Retrieves the HTML content from the specified URL.
    
    Args:
        baseurl (str): The URL to retrieve the HTML from.
        
    Returns:
        HTMLParser or None: An instance of the HTMLParser class containing the parsed HTML content,
        or None if an error occurred during the request.
        
    Raises:
        httpx.RequestError: If an error occurs while making the HTTP request.
        httpx.HTTPStatusError: If the HTTP response status code indicates an error.
        
    Notes:
        - The function uses the User-Agent header to mimic a web browser.
        - The function sets a timeout of 10 seconds for the HTTP request.
        - The function does not follow redirects if the response status code is 301 or 302.
        - If a redirect occurs, the function prints the redirect response and location.
        - If an error occurs during the request, the function prints an error message.
        
    """
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/126.0"}

    try:
        res = httpx.get(baseurl, headers=headers, timeout=10.0, follow_redirects=False)
        res.raise_for_status()
        if res.status_code in {301, 302}:  # Handle redirects
            print(f"Redirect response '{res.status_code} {res.reason_phrase}' for url '{baseurl}'")
            print(f"Redirect location: '{res.headers.get('Location')}'")
            return None
        html = HTMLParser(res.text)
        return html
    except (httpx.RequestError, httpx.HTTPStatusError) as e:
        print(f"An error occurred while requesting {baseurl}: {e}")
        return None

def extract_text(html, sel):
    """
    Extracts text from HTML using a CSS selector.

    Args:
        html (HTML): The HTML object to extract text from.
        sel (str): The CSS selector to locate the desired element.

    Returns:
        str: The extracted text, or "None" if no element is found.

    Raises:
        AttributeError: If the selected element does not have a text attribute.
        
    """
    try:
        raw_text = html.css_first(sel).text(strip=True)
        return clean_text(raw_text)
    except AttributeError:
        return "None"

def extract_debut(text):
    """
    Extracts debut information from the given text.

    Args:
        text (str): The text containing debut information.

    Returns:
        dict: A dictionary containing the debut information with keys "chapter" and "episode".

    """
    debut_info = {"chapter": "None", "episode": "None"}
    # Split the debut text by semicolon and process each part
    parts = text.split(';')
    for part in parts:
        clean_part = clean_text(part)
        chapter_match = re.search(r'Chapter\s*(\d+)', clean_part)
        episode_match = re.search(r'Episode\s*(\d+)', clean_part)
        if chapter_match:
            debut_info["chapter"] = chapter_match.group(1)
        if episode_match:
            debut_info["episode"] = episode_match.group(1)
    return debut_info

def get_debut_arc(chapter):
    """
    Returns the debut arc of a given chapter number.
    
    Args:
    - chapter (int): The chapter number.
    
    Returns:
    - str: The name of the debut arc corresponding to the given chapter number.
    
    Notes:
    - The debut arcs are based on the One Piece manga series.
    - The chapter ranges for each arc are inclusive.
    - If the given chapter number does not fall within any arc range, "Egghead" is returned.
    """
    chapter = int(chapter)
    
    if chapter >= 1 and chapter <= 7:
        return "Romance Dawn"
    elif chapter >= 8 and chapter <= 21:
        return "Orange Town"
    elif chapter >= 22 and chapter <= 41:
        return "Syrup Village"
    elif chapter >= 42 and chapter <= 68:
        return "Baratie"
    elif chapter >= 69 and chapter <= 95:
        return "Arlong Park"
    elif chapter >= 96 and chapter <= 100:
        return "Loguetown"
    elif chapter >= 101 and chapter <= 105:
        return "Reverse Mountain"
    elif chapter >= 106 and chapter <= 114:
        return "Whiskey Peak"
    elif chapter >= 115 and chapter <= 129:
        return "Little Garden"
    elif chapter >= 130 and chapter <= 154:
        return "Drum Island"
    elif chapter >= 155 and chapter <= 217:
        return "Alabasta"
    elif chapter >= 218 and chapter <= 236:
        return "Jaya"
    elif chapter >= 237 and chapter <= 302:
        return "Skypiea"
    elif chapter >= 303 and chapter <= 321:
        return "Long Ring Long Land"
    elif chapter >= 322 and chapter <= 374:
        return "Water 7"
    elif chapter >= 375 and chapter <= 441:
        return "Enies Lobby"
    elif chapter >= 442 and chapter <= 489:
        return "Thriller Bark"
    elif chapter >= 490 and chapter <= 513:
        return "Sabaody Archipelago"
    elif chapter >= 514 and chapter <= 524:
        return "Amazon Lily"
    elif chapter >= 525 and chapter <= 549:
        return "Impel Down"
    elif chapter >= 550 and chapter <= 597:
        return "Marineford"
    elif chapter >= 598 and chapter <= 602:
        return "Return to Sabaody"
    elif chapter >= 603 and chapter <= 653:
        return "Fish-Man Island"
    elif chapter >= 654 and chapter <= 699:
        return "Punk Hazard"
    elif chapter >= 700 and chapter <= 801:
        return "Dressrosa"
    elif chapter >= 802 and chapter <= 824:
        return "Zou"
    elif chapter >= 825 and chapter <= 902:
        return "Whole Cake Island"
    elif chapter >= 903 and chapter <= 908:
        return "Reverie"
    elif chapter >= 909 and chapter <= 1057:
        return "Wano"
    else:
        return "Egghead"

def extract_gender(html):
    """
    Extracts the gender of a character from the given HTML.

    Args:
        html (str): The HTML content of the page.

    Returns:
        str: The gender of the character. Possible values are "Female", "Male", or "Unknown".
    """
    gender = "Unknown"
    category = html.css_first("div.page-header__categories")
    if category:
        links = category.css("a")
        for link in links:
            href = link.attributes.get("href", "")
            if "/wiki/Category:Female_Characters" in href:
                gender = "Female"
                break
            elif "/wiki/Category:Male_Characters" in href:
                gender = "Male"
                break
    return gender

def extract_race(html):
    """
    Extracts the race information from the given HTML.
    
    Args:
        html (HTML): The HTML object containing the race information.
        
    Returns:
        list: A list of races extracted from the HTML.
        
    Notes:
        - The function searches for race categories in the HTML and extracts the races
        associated with those categories, appending them to the corresponding race to the list.
        - If no race is found, the function appends "Other" to the list.
    """
    race = []
    category = html.css_first("div.page-header__categories")
    dropdown = html.css_first("div.wds-dropdown__content")
    
    links = []
    if category:
        links.extend(category.css("a"))
        
    if dropdown:
        links.extend(dropdown.css("a"))
        
    for link in links:
        href = link.attributes.get("href", "")
        if "/wiki/Category:Animals" in href:
            race.append("Animals")
        elif "/wiki/Category:Homies" in href:
            race.append("Homies")
        elif "/wiki/Category:Talking_Animals" in href:
            race.append("Talking Animals")
        elif "/wiki/Category:Toys" in href:
            race.append("Toys")
        elif "/wiki/Category:Buccaneers" in href:
            race.append("Buccaneers")
        elif "/wiki/Category:Inanimate_Zoan_Users" in href:
            race.append("Inanimate_Zoan_Users")
        elif "/wiki/Category:Clones" in href:
            race.append("Clones")
        elif "/wiki/Category:Cyborgs" in href:
            race.append("Cyborgs")
        elif "/wiki/Category:Modified_Humans" in href:
            race.append("Modified Humans")
        elif "/wiki/Category:Numbers" in href:
            race.append("Numbers")
        elif "/wiki/Category:Robots" in href:
            race.append("Robots")
        elif "/wiki/Category:Satellites" in href:
            race.append("Satellites")
        elif "/wiki/Category:Dwarves" in href:
            race.append("Dwarves")
        elif "/wiki/Category:Fish-Men" in href:
            race.append("Fish-Men")
        elif "/wiki/Category:Giants" in href:
            race.append("Giants")
        elif "/wiki/Category:Humans" in href:
            race.append("Humans")
        elif "/wiki/Category:Living_Weapons" in href:
            race.append("Living Weapons")
        elif "/wiki/Category:Longarms" in href:
            race.append("Longarms")
        elif "/wiki/Category:Longarm_Hybrids" in href:
            race.append("Longarm Hybrids")
        elif "/wiki/Category:Longlegs" in href:
            race.append("Longlegs")
        elif "/wiki/Category:Longleg_Hybrids" in href:
            race.append("Longleg Hybrids")
        elif "/wiki/Category:Lunarians" in href:
            race.append("Lunarians")
        elif "/wiki/Category:Merfolk" in href:
            race.append("Merfolk")
        elif "/wiki/Category:Merfolk_Hybrids" in href:
            race.append("Merfolk Hybrids")
        elif "/wiki/Category:Mink_Tribe" in href:
            race.append("Mink Tribe")
        elif "/wiki/Category:Skypieans" in href:
            race.append("Skypieans")
        elif "/wiki/Category:Shandia" in href:
            race.append("Shandia")
        elif "/wiki/Category:Birkans" in href:
            race.append("Birkans")
        elif "/wiki/Category:Sky_Island_Natives" in href:
            race.append("Sky Island Natives")
            
    if not race:
        race.append("Other")
            
    return race
        

def extract_bounty(html):
    """
    Extracts the bounty value and cross-guild flag from the given HTML.
    
    Args:
        html (str): The HTML content to extract the bounty from.
        
    Returns:
        tuple: A tuple containing the bounty value (str) and the cross-guild flag (bool).
    """
    bounty = "None"
    cross_guild = False
    cross_guild_bounty_span = html.css_first("div[data-source='bounty'] > div.pi-data-value > span")
    if cross_guild_bounty_span:
        title_attr = cross_guild_bounty_span.attributes.get("title", "")
        if title_attr:
            bounty = re.search(r'Value: ([\d,]+) Belly', title_attr).group(1)
            cross_guild = True
    
    bounty_div = html.css('div[data-source="bounty"]')
        
    if bounty_div:
        bounty_value = bounty_div[0].css_first('div.pi-data-value.pi-font')
        if bounty_value:
            # Extract text without HTML tags and return
            bounty = ' '.join(bounty_value.text(strip=True).split()).split("[")[0]
    
    bounty = clean_text(bounty)
    re.sub(r'[^0-9,]', '', bounty)
    if not bounty:
        bounty = "Unknown"
    return clean_text(bounty), cross_guild

def extract_haki(html):
    """
    Extracts the types of Haki a character has from the given HTML.
    
    Args:
        html (str): The HTML content to extract Haki from.
        
    Returns:
        dict: A dictionary containing the types of Haki found in the HTML.
    """
    abilities_tab = html.css_first("a[title$='/Abilities and Powers']")
    if abilities_tab:
        abilities_url = urljoin(base_url, abilities_tab.attributes.get("href"))
        html = get_html(abilities_url)
    
    haki_types = {
        "Busoshoku Haki": False,
        "Kenbunshoku Haki": False,
        "Haoshoku Haki": False
    }
    
    # Check for Haki spans
    if html.css_first("span#Busoshoku_Haki.mw-headline"):
        haki_types["Busoshoku Haki"] = True
    if html.css_first("span#Kenbunshoku_Haki.mw-headline"):
        haki_types["Kenbunshoku Haki"] = True
    if html.css_first("span#Haoshoku_Haki.mw-headline"):
        haki_types["Haoshoku Haki"] = True
    
    # If no specific Haki spans found, check the general Haki section for links
    if not any(haki_types.values()):
        haki_section = html.css_first("span#Haki.mw-headline")
        if haki_section:
            # Navigate to the next sibling elements
            haki_paragraph = haki_section.parent.next
            while haki_paragraph:
                if haki_paragraph.tag == "p":
                    for link in haki_paragraph.css("a"):
                        href = link.attributes.get("href", "")
                        if "/wiki/Haki/Busoshoku_Haki" in href:
                            haki_types["Busoshoku Haki"] = True
                        elif "/wiki/Haki/Kenbunshoku_Haki" in href:
                            haki_types["Kenbunshoku Haki"] = True
                        elif "/wiki/Haki/Haoshoku_Haki" in href:
                            haki_types["Haoshoku Haki"] = True
                haki_paragraph = haki_paragraph.next

    return haki_types
    
def extract_arcs(html):    
    """
    Extracts the arcs from the given HTML content.
    
    Args:
        html (str): The HTML content to extract arcs from.
        
    Returns:
        dict: A dictionary containing the arcs as keys and their presence status as values.
    """
    arc_ids = [
        "Romance_Dawn_Arc", "Orange_Town_Arc", "Syrup_Village_Arc", "Baratie_Arc",
        "Arlong_Park_Arc", "Loguetown_Arc", "Reverse_Mountain_Arc", "Whiskey_Peak_Arc",
        "Little_Garden_Arc", "Drum_Island_Arc", "Alabasta_Arc", "Jaya_Arc",
        "Skypiea_Arc", "Long_Ring_Long_Land_Arc", "Water_7_Arc", "Enies_Lobby_Arc",
        "Thriller_Bark_Arc", "Sabaody_Archipelago_Arc", "Amazon_Lily_Arc", "Impel_Down_Arc",
        "Marineford_Arc", "Post-War_Arc", "Return_to_Sabaody_Arc", "Fish-Man_Island_Arc",
        "Punk_Hazard_Arc", "Dressrosa_Arc", "Zou_Arc", "Whole_Cake_Island_Arc",
        "Levely_Arc", "Wano_Country_Arc", "Egghead_Arc"
    ]
    
    # Dictionary to store arcs and their presence status
    arcs = {}
    for arc_id in arc_ids:
        if arc_id == "Sabaody_Archipelago_Arc":
            arc_name = "Sabaody Archipelago"
        elif arc_id == "Levely_Arc":
            arc_name = "Reverie"
        else:
            arc_name = arc_id.replace("_Arc", "").replace("_", " ")
        arcs[arc_name] = False
        
    tab_changed = False
    
    # Check if there is a history tab and update HTML content accordingly
    history_tab = html.css_first("a[title$='/History']")
    if history_tab:
        histories_url = urljoin(base_url, history_tab.attributes.get("href"))
        html = get_html(histories_url)
        tab_changed = True
    
    # Check each arc ID in the HTML for presence and update arcs dictionary
    for arc_id in arc_ids:
        if arc_id == "Sabaody_Archipelago_Arc":
            arc_name = "Sabaody Archipelago"
        elif arc_id == "Levely_Arc":
            arc_name = "Reverie"
        else:
            arc_name = arc_id.replace("_Arc", "").replace("_", " ")
        
        if html.css_first(f"span#{arc_id}.mw-headline"):
            arcs[arc_name] = True
            
    # If tab was changed, check for sub-tabs and update arcs dictionary
    if tab_changed:
        # Find the first occurrence of div.article-tabs
        article_tabs_div = html.css_first("div.article-tabs")
        
        if article_tabs_div:
            # Find the li element with class "at-selected" within the first article-tabs div
            selected_li = article_tabs_div.css_first("li.at-selected")
            
            if selected_li:
                # Find the first ul within the nested article-tabs div
                nested_ul = selected_li.css_first("div.article-tabs > ul")
                
                if nested_ul:
                    for tab in nested_ul.iter():
                        sub_tab_link = tab.css_first("a")
                        if sub_tab_link:
                            sub_tab_url = urljoin(base_url, sub_tab_link.attributes.get("href"))
                            sub_tab_html = get_html(sub_tab_url)
                            
                            for arc_id in arc_ids:
                                if arc_id == "Sabaody_Archipelago_Arc":
                                    arc_name = "Sabaody Archipelago"
                                elif arc_id == "Levely_Arc":
                                    arc_name = "Reverie"
                                else:
                                    arc_name = arc_id.replace("_Arc", "").replace("_", " ")
                                
                                if sub_tab_html.css_first(f"span#{arc_id}.mw-headline"):
                                    arcs[arc_name] = True
                            
    return arcs

def extract_character_detail(html):
    """
    Extracts character details from the given HTML.

    This function parses the HTML to extract various character attributes such as
    name, image, occupation, affiliation, status, and origin. It processes the 
    information contained within an 'aside' element with the class 'portable-infobox'.

    Args:
        html (object): The HTML content to be parsed.

    Returns:
        dict: A dictionary containing the extracted character attributes.
    """
    
    def split_and_clean(text):
        """
        Splits the given text by ';' and removes leading and trailing whitespace from each item.

        Args:
            text (str): The text to be split and cleaned.

        Returns:
            list: A list of cleaned items.

        """
        return [item.strip() for item in text.split(';') if item.strip()]
    
    attributes = {}
    aside = html.css_first("aside.portable-infobox")
    if aside is None:
        return attributes
    
    attributes['id'] = count
    
    attributes['name'] = extract_text(aside, "h2")
    attributes['image'] = aside.css_first("img").attributes.get("src", "n/a") if aside.css_first("img") else "None"
    
    occupation = extract_text(aside, "div[data-source='occupation'] > div.pi-data-value")
    attributes['occupation'] = split_and_clean(occupation) if occupation != "None" else []

    affiliation = extract_text(aside, "div[data-source='affiliation'] > div.pi-data-value")
    attributes['affiliation'] = split_and_clean(affiliation) if affiliation != "None" else []

    status = extract_text(aside, "div[data-source='status'] > div.pi-data-value")
    attributes['status'] = status

    origin = extract_text(aside, "div[data-source='origin'] > div.pi-data-value")
    if origin == "New World" or origin == "Punk Hazard" or origin == "Zou" or origin == "Wano Country":
        origin = "Grand Line"
    elif origin == "Lvneel Kingdom":
        origin = "North Blue"
    elif origin == "None" and "Shandia" in attributes['affiliation'] or "God's Army" in attributes['affiliation'] or "White Berets" in attributes['affiliation']:
        origin = "Skypiea"
    elif origin == "Sky Island" or origin == "Sky Islands" or origin == "Jaya":
        origin = "Skypiea"
    
    attributes['origin'] = origin
    
    race = extract_race(html)
    attributes['race'] = race
    
    dfname = extract_text(aside, "div[data-source='dfname'] > div.pi-data-value")
    attributes['dfname'] = dfname
    
    dfename = extract_text(aside, "div[data-source='dfename'] > div.pi-data-value")
    attributes['dfename'] = dfename
    
    dftype = extract_text(aside, "div[data-source='dftype'] > div.pi-data-value")
    attributes['dftype'] = dftype
    
    debut = extract_text(aside, "div[data-source='first'] > div.pi-data-value")
    attributes['debut'] = extract_debut(debut) if debut != "None" else {"chapter": "None", "episode": "None"}
        
    if attributes['debut']['chapter'] != "None":
        attributes['debut_arc'] = get_debut_arc(attributes['debut']['chapter'])
    else:
        attributes['debut_arc'] = "Unknown"

    attributes['gender'] = extract_gender(html)
    
    bounty_attribs = extract_bounty(html)
    attributes['bounty'] = bounty_attribs[0]
    attributes['cross_guild_bounty'] = bounty_attribs[1]
    
    attributes['haki'] = extract_haki(html)
    attributes['arcs'] = extract_arcs(html)
    
    affiliation_set.update(attributes['affiliation'])
    origin_set.add(attributes['origin'])
    race_set.update(attributes['race'])
    dftype_set.add(attributes['dftype'])
    gender_set.add(attributes['gender'])
    bounty_set.add(attributes['bounty'])
    
    affiliation_counter.update(attributes['affiliation'])
    origin_counter[attributes['origin']] += 1
    race_counter.update(attributes['race'])
    dftype_counter[attributes['dftype']] += 1
    debut_arc_counter[attributes['debut_arc']] += 1
    gender_counter[attributes['gender']] += 1
    bounty_counter[attributes['bounty']] += 1
    haki_counter.update(attributes['haki'])
    arcs_counter.update(attributes['arcs'])

    return attributes

def parse_page(html):
    """
    Parse the HTML content and extract URLs of characters from a table.

    Args:
        html (str): The HTML content to parse.

    Yields:
        str: The URLs of characters.

    """
    characters = html.css("table.fandom-table:first-of-type tbody tr td:nth-child(2)")
    for character in characters:
        yield urljoin(base_url, character.css_first("a").attributes["href"])

def main():
    """
    Scrapes data from a website and saves it to JSON files.
    The function performs the following steps:
    1. Retrieves the HTML content of a webpage containing a list of canon characters.
    2. Parses the HTML content to extract the character URLs.
    3. Scrapes the character details from each URL and appends them to a list.
    4. Displays a progress bar to track the scraping progress.
    5. Saves the scraped character details to a JSON file.
    6. Saves the counts of various character attributes to separate JSON files.
    """
    global count
    character_list = []
    baseurl = "https://onepiece.fandom.com/wiki/List_of_Canon_Characters"
    character_list_html = get_html(baseurl)
    characters = list(parse_page(character_list_html))  # Convert generator to list for progress tracking
    
    max_length = max(len(character) for character in characters)
    total_characters = len(characters)
    
    with tqdm(total=total_characters, desc="Progress", unit=" characters", ncols=150, bar_format='{l_bar}{bar}{r_bar}', ascii=False, leave=True) as pbar:
        for character in characters:
            # if count >= 10:
            #     break
            
            # Pad character URL to maximum length with spaces
            padded_character = f"{character:<{max_length}}"
            pbar.set_description(f"Scraping: {padded_character}")
            character_html = get_html(character)
            if character_html is None:
                continue
            character_detail = extract_character_detail(character_html)
            character_list.append(character_detail)
            count += 1
            pbar.update(1)  # Update progress bar
            
    with open("characters.json", "w", encoding="utf-8") as f:
        json.dump(character_list, f, ensure_ascii=False, indent=4)
    
    attribs = {
        "affiliation": list(affiliation_set),
        "origin": list(origin_set),
        "race": list(race_set),
        "dftype": list(dftype_set),
        "debut_arc": list(debut_arc_set),
        "gender": list(gender_set),
        "bounty": list(bounty_set),
        "haki": list(haki_set),
        "arcs": list(arcs_set)
    }
    
    with open("atribs.json", "w", encoding="utf-8") as f:
        json.dump(attribs, f, ensure_ascii=False, indent=4)
        
    trash_values_count = 10
    attrib_counters = {
        "affiliation_counter": dict(filter(lambda x: x[1] >= trash_values_count, affiliation_counter.items())),
        "origin_counter": dict(filter(lambda x: x[1] >= trash_values_count, origin_counter.items())),
        "race_counter": dict(filter(lambda x: x[1] >= trash_values_count, race_counter.items())),
        "dftype_counter": dict(dftype_counter),
        "debut_arc_counter": dict(debut_arc_counter),
        "gender_counter": dict(gender_counter),
        "bounty_counter": dict(bounty_counter),
        "haki_counter": dict(haki_counter),
        "arcs_counter": dict(arcs_counter)
    }
    
    with open("attribCounter.json", "w", encoding="utf-8") as f:
        json.dump(attrib_counters, f, ensure_ascii=False, indent=4)
    
if __name__ == "__main__":
    main()

'''
regex to look for docstrings: # """(.|\n)+?"""

disallow selection of attribs: origin-none, race-other, dftype-unknown, debut_arc-unknown, bounty-unknown (remove all text after first [ & clean text)

for testing, dont filter the counters to > 1 count, and check what needs to be combined

# skip any (former) attribute?
'''