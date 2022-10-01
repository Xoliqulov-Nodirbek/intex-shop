/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth:{
      "1120" : "1120px",
    },
    extend: {
      colors: {
        green: {
          main: '#00939C',
          recommend: '#139D4B',
          transparent: 'rgba(0, 147, 152, 0.09)',
          brand: "rgb(0, 150, 150)",
        },
        yellow: {
          btn: '#FFE600',
        },
        red:{

        },
        gray: {
          bg: '#f0f0f0',
        },
        blacker:{
          "02" : "rgba(0, 0, 0, 0.19)",
        },
        lighter: {
          "01" : "rgba(248, 248, 248, 1)",
        }
      },
      boxShadow: {
        cardShadow: '0 5px 10px rgba(0, 0, 0, 0.25)',
        labelShadow: '0 1px 6px rgba(0, 0, 0, 0.25)',
        dropShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
        btnShadow: '0 1px 7px rgba(0, 0, 0, 0.25)',
        categoryShadow: '0 10px 10px rgba(0, 0, 0, 0.25)',
      },
      dropShadow: {
        inputShadow: '0 0 4px rgba(0, 0, 0, 0.25)',
        textShadow: '0 4px 10px rgb(0 0 0 / 25%)',
      },
      width: {
        inputWidth: "360px",
        consul: "330px",
        "633": "633px",
        "500": "500px",
        "350": "350px",
        "330": "330px",
        orderWidth: "1042px",
        cardWidth: '340px',
        resCardWidth: '310px',
        modalWidth: '441px',
        resModalWidth: '329px',
        itemModalWidth: '1130px',
        itemCardWidth: '633px',
      },
      height: {
        "505": "505px",
        cardHeight: '284px',
        resCardHeight: '250px',
        modalHeight: '584px',
        resModalHeight: '510px',
        itemModalHeight: '584px',
        itemCardHeight: '505px',
      },
      borderRadius: {
        cardRadius: '0px 35px 35px 35px',
        btnRadius: '0px 10px;',
        labelRadius:'0px 0px 10px 0px;',
        modalRadius: '35px',
        oformit:"10px",
      },
    },
    screens:{
      "min_sm": "321px",
      "min_md": "380px",
      "min_lg": "480px",
      "sm":	"640px",
      "md":	"768px",
      "lg":	"1024px",
      "xl":	"1280px",
    },
    plugins: [],
  }
}
