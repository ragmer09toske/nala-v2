# Build Sekoru v3

## Pluto Server: 35.238.53.116 

Install location: `/opt/sekoru/sekoru-web-v3`  
Server Start command: `npm run serve`

---


## v0.2 Base v3 Build

### Node Setup:

- Bulit with node ***v18.16.1***

```shell
> nvm install 18.16.1
> nvm use 18.16.1
```

### Install and Build

- Need to use `--force` to get past depencency errors

```shell
> rm -rf node_modules
> npm cache clean --force
...
119 vulnerabilities (72 moderate, 29 high, 18 critical)

> npm install --force
> npm run bulld 
> npm run serve
```

### MySQL DB Setup

- DB Server: 35.238.126.168
- DB Name: sekoru_app_v3_prod
- User: sekoru-mysql-prod  
   
### DB Admin 
*Note:* mysql server is running on Google Cloud and firewall whitelist must be edited for access.
- <https://console.cloud.google.com/sql/instances?project=sekoru&pli=1>

### Server 

- <http://localhost:3001>

#### Admin URL

- <http://localhost:3001/siteadmin/login>  

#### Default Credentials

- Username: `admin@radicalstart.com`
- Password: `qwerty123`  


## Text Localization Files (US-English)
- `src/locale/messages.js`
- `src/messages/_default.json`
- `src/messages/en-US.json`  // This is the main page the others pick up missing strings in the localization files.





<br>
<br>
<br>


---

# *Legacy Info*

## RentALL Cars — "[Explore more](https://www.rentallscript.com/airbnb-clone-for-cars/)"

RentALL Cars - Car rental script is a readymade and customizable car rental marketplace platform to help startups set up their business faster.

- Ubuntu: 22.04
- MySQL: 8.0.33
- Node: v18.12.1 (18.x.x)
- Yarn: 1.22.19

### License

Copyright © 2023 RadicalStart InfoLab Pvt Ltd

---
Made with ♥ by ([RadicalStart](https://www.radicalstart.com))
