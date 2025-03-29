import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { GiftIcon, RulerIcon, ShieldCheckIcon, StarIcon } from "lucide-react";
import { Fa500Px } from "react-icons/fa";
import { NavigationDetails } from "./types";

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
            "https://media.istockphoto.com/id/1160533209/photo/female-fashion-clothes-flat-lay-square.jpg?s=612x612&w=0&k=20&c=qnrP8AQgbrQlcFPK0tVAW-1B-abTlHiGQAeP5_FY-Qw=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Accessories",
          href: "/shopping/women/accessories",
          imageSrc:
            "https://media.istockphoto.com/id/654407498/photo/woman-trendy-fashion-accessories.jpg?s=612x612&w=0&k=20&c=8Iv1m5tfkhx9WcnNwV7adXkBahEPv2EvdUnpMmQzYAI=",
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
              },
              {
                name: "Pants",
                href: "/shopping/women/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1466000525/photo/woman-shopping-denim-jeans-in-a-clothing-store.jpg?s=612x612&w=0&k=20&c=E4soNORZMS5EfGvwBJ51EODH0xnvmJQqP_sz1Q3vY_E=",
              },
              {
                name: "Bras",
                href: "/shopping/women/clothing/bras",
                imageSrc:
                  "https://media.istockphoto.com/id/936298782/photo/midsection-of-a-young-woman-at-home-getting-dressed-hooking-her-bra.jpg?s=612x612&w=0&k=20&c=j4Ayqk2dvL7Vjsux8OpCwyW2bUB8VWhYnu41HplQmqg=",
              },
              {
                name: "Maternity Clothes",
                href: "/shopping/women/clothing/maternity_clothing",
                imageSrc:
                  "https://media.istockphoto.com/id/835757738/photo/pregnant-woman-in-dress-holds-hands-on-belly-on-a-white-background.jpg?s=612x612&w=0&k=20&c=OSBb7C925wBzZb0P7EUtKDmwhtD_VLN0hYWjpNh-iac=",
              },
              {
                name: "Dresses & Skirts",
                href: "/shopping/women/clothing/dresses_skirts",
                imageSrc:
                  "https://media.istockphoto.com/id/1479374495/photo/fashion-portrait-of-woman-in-white-lace-top-and-chiffon-long-maxi-beige-skirt-boho-wedding.jpg?s=612x612&w=0&k=20&c=-0ZF4aj8US4rKPU7rKpGq44YeF5KlDW-5k2abgytMlU=",
              },
              {
                name: "Swimwear",
                href: "/shopping/women/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/928866530/photo/beautiful-woman-running-on-beach.jpg?s=612x612&w=0&k=20&c=dp_vMEzhJCv0dU6hUEENbt_Y62FxmaL3JzbyHaOZhdQ=",
              },
              {
                name: "Activewear",
                href: "/shopping/women/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1438375009/photo/group-of-women-standing-together-in-a-yoga-studio.jpg?s=612x612&w=0&k=20&c=Kpu284MGjgrTTd5Hu8zverSCfwxtUG5HhuePPJOS2xs=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/women/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/478671047/photo/excitement-before-the-prom.jpg?s=612x612&w=0&k=20&c=4tDjNXNmoKEXJdzTlhx4LP9pMl3ImU_tzt38AsjfzsM=",
              },
              {
                name: "Underwear",
                href: "/shopping/women/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1309867141/photo/colorful-clean-womens-panties-hang-on-a-rope-on-a-pink-isolated-background.jpg?s=612x612&w=0&k=20&c=6zm4XsaxrzCXmc-mHTHv1CJG3B4vi_UH8ly_LGNy6iU=",
              },
              {
                name: "Outerwear",
                href: "/shopping/women/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1357329192/photo/lifestyle-portrait-of-fashionable-woman-wearing-winter-or-spring-outfit-felt-hat-gray-wool.jpg?s=612x612&w=0&k=20&c=e8eNsDBNHsgph5g2kSOceAFeTjwgbHLuGGeeyhcgIR0=",
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
              },
              {
                name: "Sneakers",
                href: "/shopping/women/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/1346094881/photo/cropped-shot-of-an-unrecognizable-woman-tying-her-shoelaces-while-exercising-at-the-gym.jpg?s=612x612&w=0&k=20&c=MFlCV5osWA0t7r2oTP6PTzvfKoO2NUDhF40zzkomxGc=",
              },
              {
                name: "Sandals",
                href: "/shopping/women/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1034457896/photo/stylish-woman-wearing-black-summer-shoes-with-straw-sole-outdoors-comfortable-sandals-beauty.jpg?s=612x612&w=0&k=20&c=3sTprSCmzloWCysMqRjOITEdfUmhuM-TKre30nL2-TU=",
              },
              {
                name: "Boots",
                href: "/shopping/women/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/846681586/photo/high-heel-boots.jpg?s=612x612&w=0&k=20&c=0JVYDAhUsvTfaCQBZAGwF11QdWw68H506ZHU8SyIdH4=",
              },
              {
                name: "Flats",
                href: "/shopping/women/shoes/flats",
                imageSrc:
                  "https://media.istockphoto.com/id/487140548/photo/womans-legs-in-jeans-and-flat-shoes.jpg?s=612x612&w=0&k=20&c=Htp86rEXSOENE730CE9uZd-_nSlxW3mt8xtBzBqgUak=",
              },
              {
                name: "Heels",
                href: "/shopping/women/shoes/heels",
                imageSrc:
                  "https://media.istockphoto.com/id/690303248/photo/woman-shopping-for-shoes.jpg?s=612x612&w=0&k=20&c=qVPbxWvS_fKRbMvWM80jP58DIXo5siT26hds8qvJYN8=",
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
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/women/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/187043060/photo/close-up-of-a-bride-and-her-jewelry.jpg?s=612x612&w=0&k=20&c=CsNLVvOYzrCbaf6TUIBEz8yHsyr6lcUVj69D_BmTppg=",
              },
              {
                name: "Watches",
                href: "/shopping/women/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/972187570/photo/close-up-young-fashion-blogger-wearing-a-floral-jacker-and-a-white-and-golden-analog-wrist.jpg?s=612x612&w=0&k=20&c=HJrSLZQ5yL7hFWNU00ZkfwDzUBi3eipm05S4UtletTA=",
              },
              {
                name: "Wallets",
                href: "/shopping/women/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/1073589496/photo/senior-unrecognizable-woman-picking-up-a-red-wallet-from-a-rack-in-a-bags-and-wallets-store.jpg?s=612x612&w=0&k=20&c=wESJSXPXcbpJslHcS6BJbRr1CNgdBMGfLwWdrv2_cnc=",
              },
              {
                name: "Bags",
                href: "/shopping/women/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=612x612&w=0&k=20&c=-jtXLmexNgRa-eKqA1X8UJ8QYWhW7XgDiWNmzuuCHmM=",
              },
              {
                name: "Belts",
                href: "/shopping/women/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1080729004/photo/unrecognizable-female-trying-out-a-red-leather-belt-in-a-bags-and-accessories-store.jpg?s=612x612&w=0&k=20&c=NFarV7wcw4r18EHJNPiryNHqZbF7_XMheIPh5iyk5Ow=",
              },
              {
                name: "Scarves",
                href: "/shopping/women/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/831416254/photo/woman-feeling-cold-in-winter.jpg?s=612x612&w=0&k=20&c=oQeNx2mbeZX4vhJwb6JKMrDLkffQAOl131obVWXScVQ=",
              },
              {
                name: "Hats",
                href: "/shopping/women/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/928866976/photo/woman-wearing-black-hat-at-beach.jpg?s=612x612&w=0&k=20&c=8iHDGjAzUmwlmGJyBKbWyIQjYAXpjvuY2yIcBQRrakg=",
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
              },
              {
                name: "Latest Drops",
                href: "/shopping/women/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1662088111/photo/shopping-with-girlfriend.jpg?s=612x612&w=0&k=20&c=EpwnHCgwXkezn179WcIGqXHChdhHSKwyb__68P1h09Q=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/women/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/694044976/photo/i-know-ill-find-something-i-like-here.jpg?s=612x612&w=0&k=20&c=HeGXho7xvyLVdFjo7yM7c1_IErMoPPfg3Zk8hVQlV7I=",
              },
              {
                name: "Sale",
                href: "/shopping/women/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/1131097418/photo/beautiful-woman-with-shopping-bags-in-the-city-sale-shopping-tourism-and-happy-people-concept.jpg?s=612x612&w=0&k=20&c=XzAFRIbtsDn4hRYNMyiNn88CuO76vqyKLFANzRzUBzE=",
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
            "https://cdn.sanity.io/images/tzehqw2l/production/7776683b570c81940b1526996c1b23745be4c674-335x447.jpg?width=2000&height=2669&crop=center",
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
              },
              {
                name: "Pants",
                href: "/shopping/men/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1154077427/photo/stack-of-blue-jeans-on-wooden-shelf-beauty-and-fashion-clothing-concept.jpg?s=612x612&w=0&k=20&c=loFBJmT62zi0ubdBlZmp0YRU2SeRcX336sgixZ-mfvw=",
              },
              {
                name: "Swimwear",
                href: "/shopping/men/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/102285130/photo/man-on-inflatable-ring-in-pool.jpg?s=612x612&w=0&k=20&c=XnDBHybgASz9wqCtvEQzDW3lAZHkWmN0q0HfZ8_oImU=",
              },
              {
                name: "Activewear",
                href: "/shopping/men/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/882815206/photo/man-running-at-the-gym.jpg?s=612x612&w=0&k=20&c=hYl2UlySVqc6wRDWFEAal4mXEY_5CzQCsiKAGhef4z0=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/men/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/833606920/photo/business-mans-hand-in-pocket-wearing-a-watch.jpg?s=612x612&w=0&k=20&c=mFRdgwyQrQmZ2VblBPUNFTjsPXHYKLoAa4yL-vBgD-M=",
              },
              {
                name: "Underwear",
                href: "/shopping/men/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1319086313/photo/male-wearing-underwear-drinking-coffee-in-home-living-room.jpg?s=612x612&w=0&k=20&c=i09VOTVj_Yddg3g3vBDJ6q98oiW0y0ElJDmFdXCnzlA=",
              },
              {
                name: "Outerwear",
                href: "/shopping/men/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/643902794/photo/modern-man-in-winter-coat.jpg?s=612x612&w=0&k=20&c=lbx_OvqzEqThcSXaQKtcDKSvdvMyrIvPFUYrslHznxk=",
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
              },

              {
                name: "Sneakers",
                href: "/shopping/men/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/542197824/photo/portrait-of-a-man-tying-shoelaces.jpg?s=612x612&w=0&k=20&c=wTvXbrDo3lNdnJV2vFUyqh--ZmhNlIxeOPaFWnE3my0=",
              },

              {
                name: "Sandals",
                href: "/shopping/men/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/537333186/photo/mans-legs-sitting-on-the-rocks.jpg?s=612x612&w=0&k=20&c=FM15PO14BJm16k7_789Crn-77vWyCOUhM-p0lvGXTHA=",
              },
              {
                name: "Boots",
                href: "/shopping/men/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/1191174327/photo/fashion-model-wearing-jeans-and-brown-boots-with-zipper.jpg?s=612x612&w=0&k=20&c=oSPZltRJ6J1mGVFHHoUevqha47n0Ipaucr341OS7gRs=",
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
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/men/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/855839820/photo/gold-jewelry.jpg?s=612x612&w=0&k=20&c=wW8-gOBtB-x67QKguQAurBrh-zGOwl9pha0pL2d5PkY=",
              },
              {
                name: "Watches",
                href: "/shopping/men/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/533714204/photo/businessman-checking-time-from-watch.jpg?s=612x612&w=0&k=20&c=bJN94WW68Rw8uEogp3GKtBYnhcrNFNnf1SkWb0KDvGo=",
              },
              {
                name: "Wallets",
                href: "/shopping/men/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/688230458/photo/payment.jpg?s=612x612&w=0&k=20&c=cpp8_ExawAac0vR5X3L2KJeyWdOgGmE5pwTkEJjYq44=",
              },
              {
                name: "Bags",
                href: "/shopping/men/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1201027967/photo/caucasian-businessman-with-tattoo-taking-out-tablet-from-his-leather-bag.jpg?s=612x612&w=0&k=20&c=kVODVGNsrtt3hu183IXiPUf0jmGhHYbcRqYaj4I307s=",
              },
              {
                name: "Belts",
                href: "/shopping/men/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1045053646/photo/successful-man.jpg?s=612x612&w=0&k=20&c=XH2y_E6aTCWymYh5c45QGf1XlSMvCs0NaCgF0t2ybPU=",
              },
              {
                name: "Scarves",
                href: "/shopping/men/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/1288189469/photo/one-handosme-man-dressed-in-warm-winter-clothing-walking-outdoors-in-the-city.jpg?s=612x612&w=0&k=20&c=HcKQwj_B2VMG8zDTxUuy3vlhYzM5WmsbqS2SkZpkVkk=",
              },
              {
                name: "Hats",
                href: "/shopping/men/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/858160872/photo/hipster-handsome-male-model-with-beard-wearing-black-blank-baseball-cap-with-space-for-your.jpg?s=612x612&w=0&k=20&c=FPNExCl2yoVKK0kSX0V9SoPnBy3hjkJ57RGWLTxsIvk=",
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
              },
              {
                name: "Latest Drops",
                href: "/shopping/men/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1300966679/photo/young-handsome-man-in-classic-suit-over-the-lake-background.jpg?s=612x612&w=0&k=20&c=SiGc4kc1L8mK-LIGSuRzPj-UHtBY2ov5knFuzDy9hzc=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/men/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/494349086/photo/confident-and-handsome.jpg?s=612x612&w=0&k=20&c=980_nP-60-8zxhA1AputWa-0ZULEbXcIVDZe0uX_H_M=",
              },
              {
                name: "Sale",
                href: "/shopping/men/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/870572130/photo/man-enjoyig-shopping.jpg?s=612x612&w=0&k=20&c=aC7aNJV3WBVAaPmRCg4yF6ItrBJ3CLOmq8yP3bzIKPA=",
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
              },
              {
                name: "Pants",
                href: "/shopping/kids/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/173036462/photo/dirty-legs-and-feet-of-children-sitting-on-a-bench.jpg?s=612x612&w=0&k=20&c=kWuhkTixsS-2JntrEgu7jDdjluJc4tGCfGbT0buOL9E=",
              },
              {
                name: "Swimwear",
                href: "/shopping/kids/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1475279034/photo/toddler-boy-enjoying-a-day-at-the-swimming-pool.jpg?s=612x612&w=0&k=20&c=bxIDN7Cxgo-DBJckIuC49hNRlMDM9De3eulC_OLODsg=",
              },
              {
                name: "Sleepwear",
                href: "/shopping/kids/clothing/sleepwear",
                imageSrc:
                  "https://media.istockphoto.com/id/656169078/photo/brothers-and-sister-on-bed.jpg?s=612x612&w=0&k=20&c=f0euDJbP7jOpFlxHe40fqDvHdxG_Z3kJPN1FvWhwNtI=",
              },
              {
                name: "Activewear",
                href: "/shopping/kids/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1271183777/photo/kids-in-bright-sportswear-playing-basketball-and-running-after-the-ball.jpg?s=612x612&w=0&k=20&c=8KcdZaWIpwxcJ4s8INeZjaoLGk7xR6QYw_eal166m0M=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/kids/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/530558281/photo/four-happy-little-flower-girls-laughing-together-in-formal-dresses.jpg?s=612x612&w=0&k=20&c=hzAWdLXtTp1Azu6bLe1DBuQW_1ynUw3q1jE7qRiKuFw=",
              },
              {
                name: "Underwear",
                href: "/shopping/kids/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1222947627/photo/cute-little-girl-having-fun-time-jumping-on-bed-on-background-of-window-with-a-painted-rainbow.jpg?s=612x612&w=0&k=20&c=3VBvPHaePfG06MvcICSXAlFGtESC0nXxWBmQug4ZP50=",
              },
              {
                name: "Outerwear",
                href: "/shopping/kids/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/459320471/photo/playing-outside.jpg?s=612x612&w=0&k=20&c=PwzwMSLXYQaKCSKeok0WMNjugg7c-OSJmhILANRn0gY=",
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
              },

              {
                name: "Sneakers",
                href: "/shopping/kids/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/518868426/photo/new-sneakers-on-boys-feet.jpg?s=612x612&w=0&k=20&c=GSlpksRijdwFfVRvIL8LZkkwmlKUgLPduQ8Y8HTzQIo=",
              },

              {
                name: "Sandals",
                href: "/shopping/kids/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1125795420/photo/close-up-image-of-new-beautiful-kids-shoes-on-childs-feet.jpg?s=612x612&w=0&k=20&c=rARbrwcp91d1t5gjGVOqNPa7diBCDjLh-IquljSpVOw=",
              },
              {
                name: "Boots",
                href: "/shopping/kids/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/835991656/photo/feet-of-child-in-yellow-rubber-boots-jumping-over-puddle-in-rain.jpg?s=612x612&w=0&k=20&c=lq_QfbFoUU2f4Fb1RHsaEUMdUOLZvgBONneAzCnlJaU=",
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
              },
              {
                name: "Toys",
                href: "/shopping/kids/accessories/toys",
                imageSrc:
                  "https://media.istockphoto.com/id/589961490/photo/children-playing-with-colorful-blocks-building-a-block-tower.jpg?s=612x612&w=0&k=20&c=65mogYttliQ54CD7JElf6Y9DvfktYnE-qRGdsu65HwQ=",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/893143942/photo/look-im-all-grown-up.jpg?s=612x612&w=0&k=20&c=LiJuydvlBBGO99PRDUtWhAc6XLS3xGDfogIocG7r6CQ=",
              },
              {
                name: "Watches",
                href: "/shopping/kids/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/1182506881/photo/a-cute-boy-wearing-stylish-shirt-stay-near-school-looking-at-his-smart-watch-touching-the.jpg?s=612x612&w=0&k=20&c=UPhkGjCZ-6m4yxtxGyIsNRQAJB33z1LFjajzPsJxsoM=",
              },
              {
                name: "Bags",
                href: "/shopping/kids/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1016971486/photo/cute-asian-child-girl-with-backpack-running-and-going-to-school.jpg?s=612x612&w=0&k=20&c=eQTxFjEY7ZUi1q-DzJTHVKMeqEA1vXlwZ3oSntQvMPI=",
              },
              {
                name: "Belts",
                href: "/shopping/kids/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1029383076/photo/collection-of-leather-belts-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=wmTnklWIPJyRxpiooEVlwCewGGBq9LdxYbE8ijdxCkc=",
              },
              {
                name: "Scarves",
                href: "/shopping/kids/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/497534880/photo/cozy-outdoor-portrait-of-happy-toddler-child-girl-in-winter.jpg?s=612x612&w=0&k=20&c=AvOngNYY_CKXnSGHlfRhMZbRG-qHGvcXK30G0uLK0xo=",
              },
              {
                name: "Hats",
                href: "/shopping/kids/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/175622348/photo/boy-in-sunglasses-and-hat-eating-popsicle-outdoors.jpg?s=612x612&w=0&k=20&c=qV8o1QnJdsU39-VFv-vxamiCvJj1Yc0PuPx1EVKI3Cs=",
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
              },
              {
                name: "Latest Drops",
                href: "/shopping/kids/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1302266351/photo/young-boy-having-fun-in-garden-chasing-and-bursting-bubbles.jpg?s=612x612&w=0&k=20&c=iil5Zt3zBHnqyVLxuDHLxvW_YGnSkjyPNzY0DTHOMW8=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/kids/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/537424502/photo/the-best-friends-playing-together.jpg?s=612x612&w=0&k=20&c=b6kpIttyqrbnJ9T_p4QtxNoWhx8hwSscYAgoZzXgGRk=",
              },
              {
                name: "Sale",
                href: "/shopping/kids/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/664966806/photo/superheroes-cheerful-kids-expressing-positivity-concept.jpg?s=612x612&w=0&k=20&c=72nkiK5d_Te_v-7cnda4qy-4Vb188JjpgpwmE4s3GF8=",
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
            "https://media.istockphoto.com/id/1676220225/photo/children-learning-in-a-school-classroom.jpg?s=612x612&w=0&k=20&c=rBAKsscZJRWgFQmkBKJIltnhzQXUnuICCtGUbdMCcag=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/kids/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/2096480418/photo/group-of-multi-cultural-children-friends-linking-arms-looking-down-into-camera.jpg?s=612x612&w=0&k=20&c=H0-_W5BfzoBd8VqKwsj353-25GCwsF5XRHVzitJ4ffQ=",
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
    { name: "Our Story", href: "/about" },
    { name: "Find Stores", href: "/about/locations" },
  ],
};

export const about = [
  {
    name: "Customer Service",
    description:
      "Get assistance with your orders, returns, and inquiries. We're here to help you!",
    href: "/customer_service",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Frequently Asked Questions",
    description:
      "Get assistance with your orders, returns, and inquiries. We're here to help you!",
    href: "/about/frequently_asked_questions",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Privacy Policy",
    description:
      "Read how we handle and protect your personal data with complete privacy.",
    href: "/policies/privacy_policy",
    icon: ShieldCheckIcon,
  },
  {
    name: "Return Policy",
    description:
      "Learn about our hassle-free returns and exchanges process. Shop with confidence.",
    href: "/policies/return_policy",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Loyalty Program",
    description:
      "Earn rewards, discounts, and exclusive offers by joining our loyalty program.",
    href: "/loyalty_program",
    icon: GiftIcon,
  },
  {
    name: "Size Guides",
    description:
      "Ensure the perfect fit with our detailed size guides for clothes and shoes.",
    href: "/size_guides",
    icon: RulerIcon,
  },
  {
    name: "Customer Reviews",
    description:
      "See what other customers have to say about our products and services.",
    href: "/about/customer_reviews",
    icon: StarIcon,
  },
  {
    name: "Track Order",
    description:
      "Easily track your order status and delivery details in real-time.",
    href: "/customer_service/track_order",
    icon: FingerPrintIcon,
  },
  {
    name: "Terms & Conditions",
    description:
      "Understand the rules and regulations of using our website and purchasing from us.",
    href: "/policies/terms_and_conditions",
    icon: DocumentTextIcon,
  },
];

export const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Jordan",
    role: "Chief Marketing Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sam Dwyer",
    role: "VP of Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jordan Wolfe",
    role: "Product Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lillian Ruiz",
    role: "Lead Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Evelyn Collins",
    role: "Chief Technology Officer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670884442192-7b58d513cd55?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    imageUrl:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Anna West",
    role: "Lead Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Charlie Foster",
    role: "Product Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tom Smith",
    role: "Business Analyst",
    imageUrl:
      "https://images.unsplash.com/photo-1649123245135-4db6ead931b5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Olivia Bryant",
    role: "Marketing Strategist",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lucas Howard",
    role: "Senior Data Scientist",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669882305300-38b609862bee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sophia Young",
    role: "Human Resources Director",
    imageUrl:
      "https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nathaniel Perez",
    role: "Chief Financial Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Grace Wong",
    role: "Sales Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ethan Ross",
    role: "Senior Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Clara Mitchell",
    role: "UX/UI Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Miles Jenkins",
    role: "Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jessica Harris",
    role: "Customer Success Manager",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const perks = [
  {
    name: "Free returns",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Free delivery all year long",
    description:
      "Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-delivery-light.svg",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
];

export const offers = [
  {
    name: "Download the app",
    description: "Get an exclusive $5 off code",
    href: "#",
  },
  {
    name: "Return when you're ready",
    description: "60 days of free returns",
    href: "#",
  },
  {
    name: "Sign up for our newsletter",
    description: "15% off your first order",
    href: "#",
  },
];

export const trendingProducts = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  // More products...
];

export const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
    attribution: "Chris Paul, Phoenix",
  },
];

export const stats = [
  { label: "Transactions every 24 hours", value: "44 million" },
  { label: "Assets under holding", value: "$119 trillion" },
  { label: "New users annually", value: "46,000" },
];

export const values = [
  {
    name: "Be world-class",
    description:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
    Icon: Fa500Px,
  },
  {
    name: "Share everything you know",
    description:
      "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
    Icon: Fa500Px,
  },
  {
    name: "Always learning",
    description:
      "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
    Icon: Fa500Px,
  },
  {
    name: "Be supportive",
    description:
      "Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.",
    Icon: Fa500Px,
  },
  {
    name: "Take responsibility",
    description:
      "Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.",
    Icon: Fa500Px,
  },
  {
    name: "Enjoy downtime",
    description:
      "Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.",
    Icon: Fa500Px,
  },
];

export const footerNavigation = {
  shop: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  account: [
    { name: "Manage Account", href: "#" },
    { name: "Returns & Exchanges", href: "#" },
    { name: "Redeem a Gift Card", href: "#" },
  ],
  connect: [
    { name: "Contact Us", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
  ],
};

export const navigationSections = [
  { title: "Shop", items: footerNavigation.shop },
  { title: "Company", items: footerNavigation.company },
  { title: "Account", items: footerNavigation.account },
  { title: "Connect", items: footerNavigation.connect },
];

export const policies = [
  {
    name: "24/7 Customer Support",
    description:
      "Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-chat-light.svg",
  },
  {
    name: "Gift Cards",
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg",
  },
  {
    name: "For the planet",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

export const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
