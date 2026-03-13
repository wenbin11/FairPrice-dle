import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

url = "https://www.fairprice.com.sg/product-listing?collectionSlug=homepage_r4u_config_a&collectionType=personalisation&personalisationApi=homepage_r4u_config_a&personalisationType=RECOMMENDED_FOR_YOU&sorting=POPULARITY&storeIds=227%2C226%2C225%2C224%2C222%2C221%2C219%2C218%2C217%2C216%2C215%2C214%2C213%2C211%2C209%2C208%2C207%2C206%2C205%2C202%2C201%2C200%2C199%2C198%2C197%2C196%2C195%2C194%2C193%2C192%2C191%2C190%2C189%2C184%2C180%2C179%2C178%2C177%2C176%2C175%2C174%2C173%2C172%2C169%2C168%2C167%2C166%2C163%2C156%2C146%2C144%2C143%2C142%2C141%2C140%2C139%2C138%2C137%2C136%2C135%2C134%2C133%2C132%2C131%2C130%2C129%2C128%2C127%2C126%2C125%2C124%2C123%2C122%2C121%2C120%2C119%2C118%2C117%2C116%2C115%2C114%2C113%2C112%2C111%2C110%2C109%2C108%2C107%2C105%2C104%2C103%2C102%2C101%2C100%2C99%2C98%2C97%2C96%2C95%2C94%2C93%2C92%2C91%2C90%2C89%2C88%2C87%2C86%2C85%2C84%2C83%2C82%2C80%2C79%2C78%2C77%2C76%2C74%2C73%2C72%2C71%2C70%2C69%2C68%2C67%2C65%2C63%2C62%2C61%2C60%2C59%2C58%2C55%2C54%2C53%2C51%2C50%2C49%2C48%2C47%2C46%2C44%2C43%2C41%2C40%2C39%2C38%2C37%2C36%2C35%2C34%2C32%2C31%2C30%2C29%2C28%2C27%2C26%2C25%2C24%2C23%2C22%2C21%2C20%2C19%2C18%2C16%2C15%2C14%2C12%2C11%2C10%2C9%2C8%2C7%2C6%2C5%2C4%2C220%2C212%2C210%2C204%2C186%2C170%2C165%2C66%2C52%2C45%2C17%2C13%2C234%2C233%2C231%2C229%2C228&title=Recommended%20for%20you&ctaSublocation=Recommended%20for%20you&pageType=homepage_r4u_config_a"

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

        product_detail['price'] = price.text
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