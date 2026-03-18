import time
import os
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

load_dotenv()

url = os.getenv("URL_TO_SCRAPE")
driver = webdriver.Chrome()
driver.get(url)

prev_last_product = None
everything_loaded = False

results = []
count = 1

while not everything_loaded:
    # scroll to end of page (page is lazy-loaded)
    html = driver.find_element(By.TAG_NAME, 'html')
    html.send_keys(Keys.END)
    time.sleep(3)

    # get all products in the page
    all_products = driver.find_elements(By.CSS_SELECTOR, "[data-testid='highlighted-promo-label']")

    # skip if it is the 1st render
    if not prev_last_product:
        pass
    # if the last product is the same as previous -> all products rendered
    elif all_products[-1] == prev_last_product:
        everything_loaded = True

    prev_last_product = all_products[-1]

# get all products in the page
all_products = driver.find_elements(By.CSS_SELECTOR, "[data-impressiontype='PRODUCT_IMPRESSION']")
print("Found", len(all_products), "products to scrape")
try:
    for product in all_products:
        print("\nScraping product:", count)
        product_detail = {}

        product_image = product.find_element(By.XPATH, ".//img[@class='sc-aca6d870-0 janHcI']")
        product_detail['imgSrc'] = product_image.get_attribute('src')

        product_name = product.find_element(By.XPATH, ".//span[contains(@class,'gpnjpI')]")
        product_detail['name'] = product_name.text

        print("Scraped product name:", product_detail['name'])
        print("Scraped image source:", product_detail['imgSrc'])

        try:
            price = product.find_element(By.XPATH, ".//span[contains(@class,'fMJPUe')]")
        except:
            price = product.find_element(By.XPATH, ".//span[contains(@class,'iNLBGt')]")

        product_detail['price'] = float(price.text.replace("$", ""))
        print("Scraped product price:", product_detail['price'])
        
        product_detail['metadata'] = []
        product_metadata = product.find_elements(By.XPATH, ".//span[@class='sc-ab6170a9-1 jkDBep']")
        for metadata in product_metadata:
            text = metadata.text.replace('�', '').replace('•', '').strip()
            product_detail['metadata'].append(text)
        
        print("Scraped product metadata:", product_detail['metadata'])

        results.append(product_detail)
        count += 1
except Exception as e:
    print("Caught error:", e)

with open("./products.json", 'w') as f:
    f.write(str(results))