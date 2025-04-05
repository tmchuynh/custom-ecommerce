import { GiClothes, GiConverseShoe } from "react-icons/gi";
import { NavigationDetails } from "../types";
import { PiPants } from "react-icons/pi";
import { FaExclamation, FaHeart, FaStar } from "react-icons/fa";
import { IoWatchSharp } from "react-icons/io5";
import { IoIosAlert } from "react-icons/io";
export const navigations: NavigationDetails = {
  categories: [
    {
      id: "women",
      name: "Women",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/women/collections/new_arrivals",
          imageSrc:
            "https://plus.unsplash.com/premium_photo-1658506871173-7498f5371ed1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tZW4lMjBzaG9wcGluZ3xlbnwwfDB8MHx8fDA%3D",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Accessories",
          href: "/shopping/women/accessories",
          imageSrc:
            "https://images.unsplash.com/photo-1728936075080-94921fb44db9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdvbWVuJTIwc2hvcHBpbmclMjBqZXdsZXJ5fGVufDB8MHwwfHx8MA%3D%3D",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/women/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/938463446/photo/what-do-you-think-about-this-one.jpg?s=612x612&w=0&k=20&c=kxCtSwpj1tGGJ1ITJfChtC4x50cnAi3SmiKtvk1UFLA=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/women/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/974746544/photo/smiling-girl-bying-clothes-in-showroom.jpg?s=612x612&w=0&k=20&c=tqanIbdVMPOaRypay5Ni_Jnc-gG3njEPiJKQOnPL3dQ=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/women/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/1159432203/photo/portrait-of-a-mixed-race-young-woman-outdoor.jpg?s=612x612&w=0&k=20&c=SuAWhYshlH80U4irDI834nFPtt4_ZpXqx0NgtaSCk8I=",
                icon: GiClothes,
              },
              {
                name: "Pants",
                href: "/shopping/women/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1466000525/photo/woman-shopping-denim-jeans-in-a-clothing-store.jpg?s=612x612&w=0&k=20&c=E4soNORZMS5EfGvwBJ51EODH0xnvmJQqP_sz1Q3vY_E=",
                icon: GiClothes,
              },
              {
                name: "Bras",
                href: "/shopping/women/clothing/bras",
                imageSrc:
                  "https://media.istockphoto.com/id/936298782/photo/midsection-of-a-young-woman-at-home-getting-dressed-hooking-her-bra.jpg?s=612x612&w=0&k=20&c=j4Ayqk2dvL7Vjsux8OpCwyW2bUB8VWhYnu41HplQmqg=",
                icon: GiClothes,
              },
              {
                name: "Maternity Clothes",
                href: "/shopping/women/clothing/maternity_clothing",
                imageSrc:
                  "https://media.istockphoto.com/id/835757738/photo/pregnant-woman-in-dress-holds-hands-on-belly-on-a-white-background.jpg?s=612x612&w=0&k=20&c=OSBb7C925wBzZb0P7EUtKDmwhtD_VLN0hYWjpNh-iac=",
                icon: GiClothes,
              },
              {
                name: "Dresses & Skirts",
                href: "/shopping/women/clothing/dresses_skirts",
                imageSrc:
                  "https://media.istockphoto.com/id/1479374495/photo/fashion-portrait-of-woman-in-white-lace-top-and-chiffon-long-maxi-beige-skirt-boho-wedding.jpg?s=612x612&w=0&k=20&c=-0ZF4aj8US4rKPU7rKpGq44YeF5KlDW-5k2abgytMlU=",
                icon: GiClothes,
              },
              {
                name: "Swimwear",
                href: "/shopping/women/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/928866530/photo/beautiful-woman-running-on-beach.jpg?s=612x612&w=0&k=20&c=dp_vMEzhJCv0dU6hUEENbt_Y62FxmaL3JzbyHaOZhdQ=",
                icon: GiClothes,
              },
              {
                name: "Activewear",
                href: "/shopping/women/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1438375009/photo/group-of-women-standing-together-in-a-yoga-studio.jpg?s=612x612&w=0&k=20&c=Kpu284MGjgrTTd5Hu8zverSCfwxtUG5HhuePPJOS2xs=",
                icon: GiClothes,
              },
              {
                name: "Formal Wear",
                href: "/shopping/women/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/478671047/photo/excitement-before-the-prom.jpg?s=612x612&w=0&k=20&c=4tDjNXNmoKEXJdzTlhx4LP9pMl3ImU_tzt38AsjfzsM=",
                icon: GiClothes,
              },
              {
                name: "Underwear",
                href: "/shopping/women/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1309867141/photo/colorful-clean-womens-panties-hang-on-a-rope-on-a-pink-isolated-background.jpg?s=612x612&w=0&k=20&c=6zm4XsaxrzCXmc-mHTHv1CJG3B4vi_UH8ly_LGNy6iU=",
                icon: GiClothes,
              },
              {
                name: "Outerwear",
                href: "/shopping/women/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1357329192/photo/lifestyle-portrait-of-fashionable-woman-wearing-winter-or-spring-outfit-felt-hat-gray-wool.jpg?s=612x612&w=0&k=20&c=e8eNsDBNHsgph5g2kSOceAFeTjwgbHLuGGeeyhcgIR0=",
                icon: GiClothes,
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/women/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1941360741/photo/woman-hands-packing-beige-shoes-on-heels-into-plastic-box-for-comfortable-storage-organize.jpg?s=612x612&w=0&k=20&c=4k8Bsj5yiko3ZmEHsqFPmrwk6_DWsoPiKz48hKyi3yA=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/women/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/1360246837/photo/woman-putting-on-elegant-shoes-close-up-on-legs-and-red-dress.jpg?s=612x612&w=0&k=20&c=Yaxv0BRfT-5MYqjgOBB0HhEeDeVKUl-F7gjOLmIywbY=",
                icon: GiConverseShoe,
              },
              {
                name: "Sneakers",
                href: "/shopping/women/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/1346094881/photo/cropped-shot-of-an-unrecognizable-woman-tying-her-shoelaces-while-exercising-at-the-gym.jpg?s=612x612&w=0&k=20&c=MFlCV5osWA0t7r2oTP6PTzvfKoO2NUDhF40zzkomxGc=",
                icon: GiConverseShoe,
              },
              {
                name: "Sandals",
                href: "/shopping/women/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1034457896/photo/stylish-woman-wearing-black-summer-shoes-with-straw-sole-outdoors-comfortable-sandals-beauty.jpg?s=612x612&w=0&k=20&c=3sTprSCmzloWCysMqRjOITEdfUmhuM-TKre30nL2-TU=",
                icon: GiConverseShoe,
              },
              {
                name: "Boots",
                href: "/shopping/women/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/846681586/photo/high-heel-boots.jpg?s=612x612&w=0&k=20&c=0JVYDAhUsvTfaCQBZAGwF11QdWw68H506ZHU8SyIdH4=",
                icon: GiConverseShoe,
              },
              {
                name: "Flats",
                href: "/shopping/women/shoes/flats",
                imageSrc:
                  "https://media.istockphoto.com/id/487140548/photo/womans-legs-in-jeans-and-flat-shoes.jpg?s=612x612&w=0&k=20&c=Htp86rEXSOENE730CE9uZd-_nSlxW3mt8xtBzBqgUak=",
                icon: GiConverseShoe,
              },
              {
                name: "Heels",
                href: "/shopping/women/shoes/heels",
                imageSrc:
                  "https://media.istockphoto.com/id/690303248/photo/woman-shopping-for-shoes.jpg?s=612x612&w=0&k=20&c=qVPbxWvS_fKRbMvWM80jP58DIXo5siT26hds8qvJYN8=",
                icon: GiConverseShoe,
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/women/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/524906964/photo/top-view-of-fashion-female-accessories-for-woman.jpg?s=612x612&w=0&k=20&c=qDvtQeC80Z7rLySV6ycasi3psbYvi0AGPQ8dM5Q7gxE=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/women/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/1134003334/photo/young-woman-walking-on-street.jpg?s=612x612&w=0&k=20&c=5kRJCmzZl3CS1q7cBJrY6pBO1o_FRJnVV66C4GsztDU=",
                icon: IoWatchSharp,
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/women/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/187043060/photo/close-up-of-a-bride-and-her-jewelry.jpg?s=612x612&w=0&k=20&c=CsNLVvOYzrCbaf6TUIBEz8yHsyr6lcUVj69D_BmTppg=",
                icon: IoWatchSharp,
              },
              {
                name: "Watches",
                href: "/shopping/women/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/972187570/photo/close-up-young-fashion-blogger-wearing-a-floral-jacker-and-a-white-and-golden-analog-wrist.jpg?s=612x612&w=0&k=20&c=HJrSLZQ5yL7hFWNU00ZkfwDzUBi3eipm05S4UtletTA=",
                icon: IoWatchSharp,
              },
              {
                name: "Wallets",
                href: "/shopping/women/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/1073589496/photo/senior-unrecognizable-woman-picking-up-a-red-wallet-from-a-rack-in-a-bags-and-wallets-store.jpg?s=612x612&w=0&k=20&c=wESJSXPXcbpJslHcS6BJbRr1CNgdBMGfLwWdrv2_cnc=",
                icon: IoWatchSharp,
              },
              {
                name: "Bags",
                href: "/shopping/women/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=612x612&w=0&k=20&c=-jtXLmexNgRa-eKqA1X8UJ8QYWhW7XgDiWNmzuuCHmM=",
                icon: IoWatchSharp,
              },
              {
                name: "Belts",
                href: "/shopping/women/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1080729004/photo/unrecognizable-female-trying-out-a-red-leather-belt-in-a-bags-and-accessories-store.jpg?s=612x612&w=0&k=20&c=NFarV7wcw4r18EHJNPiryNHqZbF7_XMheIPh5iyk5Ow=",
                icon: IoWatchSharp,
              },
              {
                name: "Scarves",
                href: "/shopping/women/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/831416254/photo/woman-feeling-cold-in-winter.jpg?s=612x612&w=0&k=20&c=oQeNx2mbeZX4vhJwb6JKMrDLkffQAOl131obVWXScVQ=",
                icon: IoWatchSharp,
              },
              {
                name: "Hats",
                href: "/shopping/women/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/928866976/photo/woman-wearing-black-hat-at-beach.jpg?s=612x612&w=0&k=20&c=8iHDGjAzUmwlmGJyBKbWyIQjYAXpjvuY2yIcBQRrakg=",
                icon: IoWatchSharp,
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/women/collections",
            imageSrc:
              "https://media.istockphoto.com/id/1433320009/photo/diverse-businesswomen-smiling-at-the-camera-in-an-office.jpg?s=612x612&w=0&k=20&c=Pfez96VQsmXCTnpDD2S8FeYJLZVWVZ1c-tc6jGnVw8o=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/women/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/610255602/photo/happy-shopping-woman.jpg?s=612x612&w=0&k=20&c=Q6e2YxvqjIQZqf7vCtlwMDI6hvhgTlKIQXOotITOZ78=",
                icon: FaExclamation,
              },
              {
                name: "Latest Drops",
                href: "/shopping/women/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1662088111/photo/shopping-with-girlfriend.jpg?s=612x612&w=0&k=20&c=EpwnHCgwXkezn179WcIGqXHChdhHSKwyb__68P1h09Q=",
                icon: IoIosAlert,
              },
              {
                name: "Best Sellers",
                href: "/shopping/women/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/694044976/photo/i-know-ill-find-something-i-like-here.jpg?s=612x612&w=0&k=20&c=HeGXho7xvyLVdFjo7yM7c1_IErMoPPfg3Zk8hVQlV7I=",
                icon: FaStar,
              },
              {
                name: "Sale",
                href: "/shopping/women/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/1131097418/photo/beautiful-woman-with-shopping-bags-in-the-city-sale-shopping-tourism-and-happy-people-concept.jpg?s=612x612&w=0&k=20&c=XzAFRIbtsDn4hRYNMyiNn88CuO76vqyKLFANzRzUBzE=",
                icon: IoIosAlert,
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/women/collections/new_arrivals",
          imageSrc:
            "https://plus.unsplash.com/premium_photo-1664201890656-32ae80bfa8bb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvbWVuJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/women/collections/best_sellers",
          imageSrc:
            "https://media.istockphoto.com/id/867341470/photo/window-shopping.jpg?s=612x612&w=0&k=20&c=2AdLIydxyTGmePMSNu5z5RQexib39GQDF-xUsoqJBkg=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/women/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/918664682/photo/young-woman-choosing-clothes.jpg?s=612x612&w=0&k=20&c=isL-hRIaGRGKrGsCO2WtlJH-joVGrquhwB5NZ7Iw0lg=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/women/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/2158155744/photo/beautiful-young-woman-trying-on-shoes.jpg?s=612x612&w=0&k=20&c=_beFGQxQKayGhEUdPK-CwV1pTSE1VIUZIXV4m7MQMrk=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/men/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/2066301960/photo/man-with-eyeglasses-stand-at-home-use-mobile-phone-sms-texting.jpg?s=612x612&w=0&k=20&c=6WBKuAaKy43cColcv9TaSIN1gu_rIF_q-o0WtPBZ3Z8=",
          imageAlt: "New men's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/men/shoes",
          imageSrc:
            "https://media.istockphoto.com/id/1201660255/photo/genuine-leather-sneakers-shoes-for-mens-fashions.jpg?s=612x612&w=0&k=20&c=OGxmUYPA6oFdi04IppLadAhY2tRdLlQ5uWMsx8a9W6c=",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/men/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=612x612&w=0&k=20&c=wJ6yYbRrDfdmoViuQkX39s2z_0lCiNQYgEtLU--0EbY=",
          imageAlt: "Comfortable and stylish t-shirts and shirts for men.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/men/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/1368390738/photo/young-businessman-shopping-in-clothes-store.jpg?s=612x612&w=0&k=20&c=INTPQsKXscd94xwZJ5lCE-knp_JmWVbvEw_EFWutxx8=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/men/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/876424182/photo/classic-mens-shirts-stacked-on-white-background.jpg?s=612x612&w=0&k=20&c=oNZHUUeVply_VbGFsOMq8SRnjlT7nKHYaCxtRFF_kbc=",
                icon: GiClothes,
              },
              {
                name: "Pants",
                href: "/shopping/men/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1154077427/photo/stack-of-blue-jeans-on-wooden-shelf-beauty-and-fashion-clothing-concept.jpg?s=612x612&w=0&k=20&c=loFBJmT62zi0ubdBlZmp0YRU2SeRcX336sgixZ-mfvw=",
                icon: GiClothes,
              },
              {
                name: "Swimwear",
                href: "/shopping/men/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/102285130/photo/man-on-inflatable-ring-in-pool.jpg?s=612x612&w=0&k=20&c=XnDBHybgASz9wqCtvEQzDW3lAZHkWmN0q0HfZ8_oImU=",
                icon: GiClothes,
              },
              {
                name: "Activewear",
                href: "/shopping/men/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/882815206/photo/man-running-at-the-gym.jpg?s=612x612&w=0&k=20&c=hYl2UlySVqc6wRDWFEAal4mXEY_5CzQCsiKAGhef4z0=",
                icon: GiClothes,
              },
              {
                name: "Formal Wear",
                href: "/shopping/men/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/833606920/photo/business-mans-hand-in-pocket-wearing-a-watch.jpg?s=612x612&w=0&k=20&c=mFRdgwyQrQmZ2VblBPUNFTjsPXHYKLoAa4yL-vBgD-M=",
                icon: GiClothes,
              },
              {
                name: "Underwear",
                href: "/shopping/men/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1319086313/photo/male-wearing-underwear-drinking-coffee-in-home-living-room.jpg?s=612x612&w=0&k=20&c=i09VOTVj_Yddg3g3vBDJ6q98oiW0y0ElJDmFdXCnzlA=",
                icon: GiClothes,
              },
              {
                name: "Outerwear",
                href: "/shopping/men/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/643902794/photo/modern-man-in-winter-coat.jpg?s=612x612&w=0&k=20&c=lbx_OvqzEqThcSXaQKtcDKSvdvMyrIvPFUYrslHznxk=",
                icon: GiClothes,
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/men/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1292262414/photo/online-shop.jpg?s=612x612&w=0&k=20&c=I3DP6vI3wBFfcW5J80IL0XU9IiasoVcTaP-zVH-aH3Q=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/men/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/518526532/photo/mens-luxury-shoes.jpg?s=612x612&w=0&k=20&c=cAymTa7RD92v9_-8Lqt1zpM3iXRGAIFnl4WXYbq1wBE=",
                icon: GiConverseShoe,
              },
              {
                name: "Sneakers",
                href: "/shopping/men/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/542197824/photo/portrait-of-a-man-tying-shoelaces.jpg?s=612x612&w=0&k=20&c=wTvXbrDo3lNdnJV2vFUyqh--ZmhNlIxeOPaFWnE3my0=",
                icon: GiConverseShoe,
              },
              {
                name: "Sandals",
                href: "/shopping/men/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/537333186/photo/mans-legs-sitting-on-the-rocks.jpg?s=612x612&w=0&k=20&c=FM15PO14BJm16k7_789Crn-77vWyCOUhM-p0lvGXTHA=",
                icon: GiConverseShoe,
              },
              {
                name: "Boots",
                href: "/shopping/men/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/1191174327/photo/fashion-model-wearing-jeans-and-brown-boots-with-zipper.jpg?s=612x612&w=0&k=20&c=oSPZltRJ6J1mGVFHHoUevqha47n0Ipaucr341OS7gRs=",
                icon: GiConverseShoe,
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/men/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/909883316/photo/businessman-cleaning-his-shoes.jpg?s=612x612&w=0&k=20&c=YB9YHYRfTmHVaCxhvupk9-hYp67WmzxueccxWdcQ2Yk=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/men/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/984011410/photo/handsome-smiling-man-looking-away.jpg?s=612x612&w=0&k=20&c=TBebboy2N0FvXjtoB7UlcTfCLuRitNdVtzRnDhKLnXQ=",
                icon: IoWatchSharp,
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/men/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/855839820/photo/gold-jewelry.jpg?s=612x612&w=0&k=20&c=wW8-gOBtB-x67QKguQAurBrh-zGOwl9pha0pL2d5PkY=",
                icon: IoWatchSharp,
              },
              {
                name: "Watches",
                href: "/shopping/men/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/533714204/photo/businessman-checking-time-from-watch.jpg?s=612x612&w=0&k=20&c=bJN94WW68Rw8uEogp3GKtBYnhcrNFNnf1SkWb0KDvGo=",
                icon: IoWatchSharp,
              },
              {
                name: "Wallets",
                href: "/shopping/men/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/688230458/photo/payment.jpg?s=612x612&w=0&k=20&c=cpp8_ExawAac0vR5X3L2KJeyWdOgGmE5pwTkEJjYq44=",
                icon: IoWatchSharp,
              },
              {
                name: "Bags",
                href: "/shopping/men/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1201027967/photo/caucasian-businessman-with-tattoo-taking-out-tablet-from-his-leather-bag.jpg?s=612x612&w=0&k=20&c=kVODVGNsrtt3hu183IXiPUf0jmGhHYbcRqYaj4I307s=",
                icon: IoWatchSharp,
              },
              {
                name: "Belts",
                href: "/shopping/men/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1045053646/photo/successful-man.jpg?s=612x612&w=0&k=20&c=XH2y_E6aTCWymYh5c45QGf1XlSMvCs0NaCgF0t2ybPU=",
                icon: IoWatchSharp,
              },
              {
                name: "Scarves",
                href: "/shopping/men/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/1288189469/photo/one-handosme-man-dressed-in-warm-winter-clothing-walking-outdoors-in-the-city.jpg?s=612x612&w=0&k=20&c=HcKQwj_B2VMG8zDTxUuy3vlhYzM5WmsbqS2SkZpkVkk=",
                icon: IoWatchSharp,
              },
              {
                name: "Hats",
                href: "/shopping/men/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/858160872/photo/hipster-handsome-male-model-with-beard-wearing-black-blank-baseball-cap-with-space-for-your.jpg?s=612x612&w=0&k=20&c=FPNExCl2yoVKK0kSX0V9SoPnBy3hjkJ57RGWLTxsIvk=",
                icon: IoWatchSharp,
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/men/collections",
            imageSrc:
              "https://media.istockphoto.com/id/1216428594/photo/young-lady-grabbing-cup-of-coffee-and-using-smartphone.jpg?s=612x612&w=0&k=20&c=_Dqv3MAjDpx_pJRXD8IglC3I2_bXs2A5K2UVVNayLWA=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/men/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/1144491656/photo/mens-summer-casual-clothes-flat-lay.jpg?s=612x612&w=0&k=20&c=Icwk_UY2_wpRcpwP9Sk_IznIKhuNJmQh_rlWz0JCTVE=",
                icon: FaExclamation,
              },
              {
                name: "Latest Drops",
                href: "/shopping/men/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1300966679/photo/young-handsome-man-in-classic-suit-over-the-lake-background.jpg?s=612x612&w=0&k=20&c=SiGc4kc1L8mK-LIGSuRzPj-UHtBY2ov5knFuzDy9hzc=",
                icon: IoIosAlert,
              },
              {
                name: "Best Sellers",
                href: "/shopping/men/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/494349086/photo/confident-and-handsome.jpg?s=612x612&w=0&k=20&c=980_nP-60-8zxhA1AputWa-0ZULEbXcIVDZe0uX_H_M=",
                icon: FaStar,
              },
              {
                name: "Sale",
                href: "/shopping/men/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/870572130/photo/man-enjoyig-shopping.jpg?s=612x612&w=0&k=20&c=aC7aNJV3WBVAaPmRCg4yF6ItrBJ3CLOmq8yP3bzIKPA=",
                icon: IoIosAlert,
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/men/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/950927830/photo/young-man-holding-paper-bags-and-walking-in-mall.jpg?s=612x612&w=0&k=20&c=Hle9P1wiD_4_QLleea0-NbbbJHz20e7i5EKPWmTjB8k=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/men/collections//best_sellers",
          imageSrc:
            "https://media.istockphoto.com/id/1199957153/photo/man-shopping-in-central-rome.jpg?s=612x612&w=0&k=20&c=xFZw5KUja2ZRfFzIE2qPw40sCJ6pqJmvlUj49OoCW2E=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/men/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/620972806/photo/man-texting-in-the-shopping-mall.jpg?s=612x612&w=0&k=20&c=c9ByRTLwKrXzlPSBag2QzjU0pDS7P_SR07AjxqMlcU8=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/men/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/1464367016/photo/a-happy-man-is-using-mobile-phone-for-cashless-purchase-in-boutique.jpg?s=612x612&w=0&k=20&c=ScRwM6HJsyeLcWjf8Q7oyOLEo5oNMLX-lDLB7HMPsiw=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
    },
    {
      id: "kids",
      name: "Kids",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/kids/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/1662857795/photo/happy-family-relaxing-in-the-park.jpg?s=612x612&w=0&k=20&c=MQ8HBA5tE0HmlsFuvXxf3aIohKJRgDsB_DanOPu-i6o=",
          imageAlt: "New kids's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/kids/shoes",
          imageSrc:
            "https://media.istockphoto.com/id/902867422/photo/i-have-to-get-ready-for-school.jpg?s=612x612&w=0&k=20&c=Spsuu5AiCO8l0sYblU3iV7D9iBrw1NA2SyKkTMbguGA=",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Sale",
          href: "/shopping/kids/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/839295596/photo/six-pre-teen-friends-piggybacking-in-a-park-close-up-portrait.jpg?s=612x612&w=0&k=20&c=MWkFYzpRSvO1dRql3trV4k6ECO-rTy4HgF8OxrtUkH8=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/kids/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/1396160859/photo/baby-and-child-clothes-toys-in-box-second-hand-apparel-idea-circular-fashion-donation-charity.jpg?s=612x612&w=0&k=20&c=cjKWIeNfmEPVdQUBABIWSdGAvm5SUoEdQYB02XOI35c=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/kids/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/884387672/photo/part-of-being-a-kid.jpg?s=612x612&w=0&k=20&c=Sy3KhZfFaFg_dJCrk2jXtlvTi3OWWOxx0Uepa4Dvi7o=",
                icon: GiClothes,
              },
              {
                name: "Pants",
                href: "/shopping/kids/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/173036462/photo/dirty-legs-and-feet-of-children-sitting-on-a-bench.jpg?s=612x612&w=0&k=20&c=kWuhkTixsS-2JntrEgu7jDdjluJc4tGCfGbT0buOL9E=",
                icon: GiClothes,
              },
              {
                name: "Swimwear",
                href: "/shopping/kids/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1475279034/photo/toddler-boy-enjoying-a-day-at-the-swimming-pool.jpg?s=612x612&w=0&k=20&c=bxIDN7Cxgo-DBJckIuC49hNRlMDM9De3eulC_OLODsg=",
                icon: GiClothes,
              },
              {
                name: "Sleepwear",
                href: "/shopping/kids/clothing/sleepwear",
                imageSrc:
                  "https://media.istockphoto.com/id/656169078/photo/brothers-and-sister-on-bed.jpg?s=612x612&w=0&k=20&c=f0euDJbP7jOpFlxHe40fqDvHdxG_Z3kJPN1FvWhwNtI=",
                icon: GiClothes,
              },
              {
                name: "Activewear",
                href: "/shopping/kids/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1271183777/photo/kids-in-bright-sportswear-playing-basketball-and-running-after-the-ball.jpg?s=612x612&w=0&k=20&c=8KcdZaWIpwxcJ4s8INeZjaoLGk7xR6QYw_eal166m0M=",
                icon: GiClothes,
              },
              {
                name: "Formal Wear",
                href: "/shopping/kids/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/530558281/photo/four-happy-little-flower-girls-laughing-together-in-formal-dresses.jpg?s=612x612&w=0&k=20&c=hzAWdLXtTp1Azu6bLe1DBuQW_1ynUw3q1jE7qRiKuFw=",
                icon: GiClothes,
              },
              {
                name: "Underwear",
                href: "/shopping/kids/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1222947627/photo/cute-little-girl-having-fun-time-jumping-on-bed-on-background-of-window-with-a-painted-rainbow.jpg?s=612x612&w=0&k=20&c=3VBvPHaePfG06MvcICSXAlFGtESC0nXxWBmQug4ZP50=",
                icon: GiClothes,
              },
              {
                name: "Outerwear",
                href: "/shopping/kids/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/459320471/photo/playing-outside.jpg?s=612x612&w=0&k=20&c=PwzwMSLXYQaKCSKeok0WMNjugg7c-OSJmhILANRn0gY=",
                icon: GiClothes,
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/kids/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1158747485/photo/mature-woman-shopping-for-shoes-for-her-son.jpg?s=612x612&w=0&k=20&c=BJ2Do8SK2c3888scyqBxVPhdBAMcxluSwrOy9vQECro=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/kids/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/472224340/photo/new-pair-of-childs-blue-shoes-on-a-white-background.jpg?s=612x612&w=0&k=20&c=g-Dpkrl-azMpRLOClYkQepFpjCbdp2TIi4BZVRFTjXE=",
                icon: GiConverseShoe,
              },
              {
                name: "Sneakers",
                href: "/shopping/kids/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/518868426/photo/new-sneakers-on-boys-feet.jpg?s=612x612&w=0&k=20&c=GSlpksRijdwFfVRvIL8LZkkwmlKUgLPduQ8Y8HTzQIo=",
                icon: GiConverseShoe,
              },
              {
                name: "Sandals",
                href: "/shopping/kids/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1125795420/photo/close-up-image-of-new-beautiful-kids-shoes-on-childs-feet.jpg?s=612x612&w=0&k=20&c=rARbrwcp91d1t5gjGVOqNPa7diBCDjLh-IquljSpVOw=",
                icon: GiConverseShoe,
              },
              {
                name: "Boots",
                href: "/shopping/kids/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/835991656/photo/feet-of-child-in-yellow-rubber-boots-jumping-over-puddle-in-rain.jpg?s=612x612&w=0&k=20&c=lq_QfbFoUU2f4Fb1RHsaEUMdUOLZvgBONneAzCnlJaU=",
                icon: GiConverseShoe,
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/kids/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/1031376168/photo/multi-ethnic-group-of-kids-lying-on-each-other-in-a-park.jpg?s=612x612&w=0&k=20&c=xCx115gov3tjkSNBxuE__xrlBF1XpNYLi6MHxl0yZeY=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/kids/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/1355723349/photo/funny-kid-girl-playing-outdoor-surprised-emotional-child-in-sunglasses-3-years-old-baby.jpg?s=612x612&w=0&k=20&c=DyH_Cl0wOy8Nz-XtxjXTsT0kUbgVfhcFwEX5KPgS-pM=",
                icon: IoWatchSharp,
              },
              {
                name: "Toys",
                href: "/shopping/kids/accessories/toys",
                imageSrc:
                  "https://media.istockphoto.com/id/589961490/photo/children-playing-with-colorful-blocks-building-a-block-tower.jpg?s=612x612&w=0&k=20&c=65mogYttliQ54CD7JElf6Y9DvfktYnE-qRGdsu65HwQ=",
                icon: IoWatchSharp,
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/893143942/photo/look-im-all-grown-up.jpg?s=612x612&w=0&k=20&c=LiJuydvlBBGO99PRDUtWhAc6XLS3xGDfogIocG7r6CQ=",
                icon: IoWatchSharp,
              },
              {
                name: "Watches",
                href: "/shopping/kids/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/1182506881/photo/a-cute-boy-wearing-stylish-shirt-stay-near-school-looking-at-his-smart-watch-touching-the.jpg?s=612x612&w=0&k=20&c=UPhkGjCZ-6m4yxtxGyIsNRQAJB33z1LFjajzPsJxsoM=",
                icon: IoWatchSharp,
              },
              {
                name: "Bags",
                href: "/shopping/kids/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1016971486/photo/cute-asian-child-girl-with-backpack-running-and-going-to-school.jpg?s=612x612&w=0&k=20&c=eQTxFjEY7ZUi1q-DzJTHVKMeqEA1vXlwZ3oSntQvMPI=",
                icon: IoWatchSharp,
              },
              {
                name: "Belts",
                href: "/shopping/kids/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1029383076/photo/collection-of-leather-belts-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=wmTnklWIPJyRxpiooEVlwCewGGBq9LdxYbE8ijdxCkc=",
                icon: IoWatchSharp,
              },
              {
                name: "Scarves",
                href: "/shopping/kids/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/497534880/photo/cozy-outdoor-portrait-of-happy-toddler-child-girl-in-winter.jpg?s=612x612&w=0&k=20&c=AvOngNYY_CKXnSGHlfRhMZbRG-qHGvcXK30G0uLK0xo=",
                icon: IoWatchSharp,
              },
              {
                name: "Hats",
                href: "/shopping/kids/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/175622348/photo/boy-in-sunglasses-and-hat-eating-popsicle-outdoors.jpg?s=612x612&w=0&k=20&c=qV8o1QnJdsU39-VFv-vxamiCvJj1Yc0PuPx1EVKI3Cs=",
                icon: IoWatchSharp,
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/kids/collections",
            imageSrc:
              "https://media.istockphoto.com/id/489803256/photo/below-view-of-young-cheerful-family-in-shopping.jpg?s=612x612&w=0&k=20&c=KcmaBiURs_ChPFCdvNKhmTD5AVEiUxM4MmANitqioz4=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/kids/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/1026632588/photo/funny-child-girl-draws-laughing-shows-hands-dirty-with-paint.jpg?s=612x612&w=0&k=20&c=7JCNEfWqx9VfnkzQs-jFwbVpk_S7X5xT8mnVE8WK3R0=",
                icon: FaExclamation,
              },
              {
                name: "Latest Drops",
                href: "/shopping/kids/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1302266351/photo/young-boy-having-fun-in-garden-chasing-and-bursting-bubbles.jpg?s=612x612&w=0&k=20&c=iil5Zt3zBHnqyVLxuDHLxvW_YGnSkjyPNzY0DTHOMW8=",
                icon: IoIosAlert,
              },
              {
                name: "Best Sellers",
                href: "/shopping/kids/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/537424502/photo/the-best-friends-playing-together.jpg?s=612x612&w=0&k=20&c=b6kpIttyqrbnJ9T_p4QtxNoWhx8hwSscYAgoZzXgGRk=",
                icon: FaStar,
              },
              {
                name: "Sale",
                href: "/shopping/kids/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/664966806/photo/superheroes-cheerful-kids-expressing-positivity-concept.jpg?s=612x612&w=0&k=20&c=72nkiK5d_Te_v-7cnda4qy-4Vb188JjpgpwmE4s3GF8=",
                icon: IoIosAlert,
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/kids/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/947959208/photo/little-kids-having-fun-outdoors.jpg?s=612x612&w=0&k=20&c=rylGvuenIxeOJQA_pckTA6MCmlHY9GZj-S9DJrreC14=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/kids/collections/best_sellers",
          imageSrc:
            "https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGtpZHN8ZW58MHx8MHx8fDA%3D",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/kids/collections/latest_drops",
          imageSrc:
            "https://images.unsplash.com/photo-1469406396016-013bfae5d83e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGtpZHN8ZW58MHx8MHx8fDA%3D",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/kids/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/1500076821/photo/happy-black-teenage-girl-in-high-school-hallway-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Kc1x5IRZz7dqtUNt8k3zFB6ZKJz4CIiT-tbB0FFmAww=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
    },
  ],
  pages: [
    { name: "Our Story", href: "/info/about" },
    { name: "Find Stores", href: "/info/about/locations" },
  ],
};
