import { GiClothes, GiConverseShoe } from "react-icons/gi";
import { IoWatchSharp } from "react-icons/io5";
import { NavigationDetails } from "../types";
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
          name: "Necklaces & Bracelets",
          href: "/shopping/women/accessories/necklaces_and_braceslets",
          imageSrc:
            "https://media.istockphoto.com/id/187043060/photo/close-up-of-a-bride-and-her-jewelry.jpg?s=612x612&w=0&k=20&c=CsNLVvOYzrCbaf6TUIBEz8yHsyr6lcUVj69D_BmTppg=",
          imageAlt: "Stylish necklaces and bracelets for every occasion.",
        },
        {
          name: "Tops",
          href: "/shopping/women/clothing/tops",
          imageSrc:
            "https://media.istockphoto.com/id/1159432203/photo/portrait-of-a-mixed-race-young-woman-outdoor.jpg?s=612x612&w=0&k=20&c=SuAWhYshlH80U4irDI834nFPtt4_ZpXqx0NgtaSCk8I=",
          imageAlt: "Great selection of tops for every occasion.",
        },
        {
          name: "Activewear",
          href: "/shopping/women/clothing/activewear",
          imageSrc:
            "https://media.istockphoto.com/id/1438375009/photo/group-of-women-standing-together-in-a-yoga-studio.jpg?s=612x612&w=0&k=20&c=Kpu284MGjgrTTd5Hu8zverSCfwxtUG5HhuePPJOS2xs=",
          imageAlt: "Stylish activewear for your fitness journey.",
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
          name: "Formal Wear",
          href: "/shopping/men/clothing/formal_wear",
          imageSrc:
            "https://media.istockphoto.com/id/833606920/photo/business-mans-hand-in-pocket-wearing-a-watch.jpg?s=612x612&w=0&k=20&c=mFRdgwyQrQmZ2VblBPUNFTjsPXHYKLoAa4yL-vBgD-M=",
          imageAlt: "Stylish formal wear for every occasion.",
        },
        {
          name: "Outerwear",
          href: "/shopping/men/clothing/outerwear",
          imageSrc:
            "https://media.istockphoto.com/id/643902794/photo/modern-man-in-winter-coat.jpg?s=612x612&w=0&k=20&c=lbx_OvqzEqThcSXaQKtcDKSvdvMyrIvPFUYrslHznxk=",
          imageAlt: "Great selection of outerwear for every occasion.",
        },
        {
          name: "Watches",
          href: "/shopping/men/accessories/watches",
          imageSrc:
            "https://media.istockphoto.com/id/533714204/photo/businessman-checking-time-from-watch.jpg?s=612x612&w=0&k=20&c=bJN94WW68Rw8uEogp3GKtBYnhcrNFNnf1SkWb0KDvGo=",
          imageAlt: "Stylish watches for your wrist.",
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
          name: "Sleepwear",
          href: "/shopping/kids/clothing/sleepwear",
          imageSrc:
            "https://media.istockphoto.com/id/656169078/photo/brothers-and-sister-on-bed.jpg?s=612x612&w=0&k=20&c=f0euDJbP7jOpFlxHe40fqDvHdxG_Z3kJPN1FvWhwNtI=",
          imageAlt: "Comfortable sleepwear for kids.",
        },
        {
          name: "Sneakers",
          href: "/shopping/kids/shoes/sneakers",
          imageSrc:
            "https://media.istockphoto.com/id/518868426/photo/new-sneakers-on-boys-feet.jpg?s=612x612&w=0&k=20&c=GSlpksRijdwFfVRvIL8LZkkwmlKUgLPduQ8Y8HTzQIo=",
          imageAlt: "Stylish sneakers for kids.",
        },
        {
          name: "Toys",
          href: "/shopping/kids/accessories/toys",
          imageSrc:
            "https://media.istockphoto.com/id/589961490/photo/children-playing-with-colorful-blocks-building-a-block-tower.jpg?s=612x612&w=0&k=20&c=65mogYttliQ54CD7JElf6Y9DvfktYnE-qRGdsu65HwQ=",
          imageAlt: "Fun toys for kids.",
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
      ],
    },
  ],
  pages: [
    { name: "Our Story", href: "/info/about" },
    { name: "Find Stores", href: "/info/about/locations" },
  ],
};
