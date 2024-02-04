const filePath = 'static/current.txt';
let shortsVideosData;  

fetch(filePath)
  .then(response => response.text())
  .then(textContent => {
    let gottentext = textContent + "}]";
    shortVideosData = JSON.parse(gottentext);
    document.querySelector(".shorts .shorts-wrap").innerHTML = shortVideosData.map(function(video, index){
        return `
            <div class ="video-wrapper">
                <div class="video">
                    <video
                    src= "/static/videos/${video.Video}.mp4"
                    index= "${index}"
                    onclick = "playpause(this)"
                    autoplay="false"
                    loop> </video>
                    
                </div>
                <div class = "details">
                <h2> ${video.Company} </h2>
                <p> ${video.Founder}</p>
                </div>
            </div>
        
        `;
    
    });
  })

function currentShort(index){
    const url = `http://127.0.0.1:5000/video/${index}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        console.log(response.json()); // assuming the response is in JSON format
    })
    .then(data => {
        console.log('Data received:', data);
        // Process the data as needed
    })
}

/*
let shortVideosData = [

        {
          "Video":"vid4",
          "Company": "DoorDash",
          "Sector": "E-commerce",
          "Location": "Bangalore",
          "Funding": "20,00,00,000",
          "Stage" : "Seed",
          "Founder": ["Stanley" , "Andy" , "Evan" , "Tony"],
          "Pitch": "Hello, I'm Stanley, I'm Andy, I'm Evan, and I'm Tony and we are the founders of DoorDash, a trailblazing force in the rapidly evolving food delivery industry. DoorDash operates in the dynamic market of food delivery services, currently valued at $150 billion and expected to reach $200 billion by 2025. In the past year, DoorDash has witnessed a remarkable 150% increase in sales, positioning itself as a key player in the fast-paced landscape of on-demand dining. Market trends underscore the vast potential for growth in this sector. The global shift towards online and mobile ordering has accelerated, with a 30% year-over-year increase in demand for food delivery services. DoorDash's data analytics reveal a 40% surge in user engagement, emphasizing the essential role DoorDash plays in meeting the evolving needs of modern consumers. Furthermore, DoorDash has solidified strategic partnerships with over 300,000 restaurants, leading to a 200% increase in our restaurant partnerships within the last two years. This extensive network allows us to offer unparalleled choices to our customers while providing valuable exposure and revenue streams for our partner establishments. To capitalize on this unprecedented opportunity, we are seeking inr 20,00,00,000 in investment to further expand our market presence, invest in cutting-edge technology to enhance user experience, and explore innovative partnerships. This investment opportunity is particularly attractive in Bangalore, a high-density urban area, where DoorDash is positioned to dominate the food delivery market. Join us in redefining how the world eats with DoorDash - not just a delivery service but a lifestyle choice and a visionary approach to the future of dining. Your investment in DoorDash is an invitation to be part of a dynamic venture that's reshaping the food industry landscape. Thank you for considering this exciting investment opportunity."
        },
        {
          "Video":"vid2",
          "Company": "Party on Demand",
          "Sector":"Entertainment",
          "Location":"Delhi",
          "Funding":"80,00,000",
          "Stage":"Pre-Seed",
          "Founder": "Willy Green",
          "Pitch": "Hello, I'm Willy Green, the enthusiastic owner of Party on Demand, an innovative solution in the event planning and entertainment sector. Party on Demand operates in a market valued at $30 billion and experiencing significant growth. In the past year, we've achieved a stellar 250% increase in revenue, positioning ourselves as a leader in providing hassle-free, on-demand event experiences. Market trends underscore the vast potential for growth in our sector. The global demand for personalized and convenient event services is on the rise, with a projected 15% annual increase. Our data analytics reveal a 20% month-over-month increase in user engagement, showcasing the strong and growing demand for Party on Demand's unique offerings. To capitalize on this momentum and expand our market presence, we are seeking inr 80,00,000 in investment. These funds will be utilized to enhance our technology platform, broaden our service offerings, and establish a flagship location in Delhi, a thriving event-centric city where Party on Demand is primed for success. Party on Demand isn't just an event planning service; it's a revolutionary approach to creating memorable experiences on demand. Your investment in Party on Demand is an invitation to be part of a dynamic venture that's redefining the event planning landscape. Thank you for considering this exciting investment opportunity."
        },
        {
          "Video":"vid5",
          "Company": "College Supply",
          "Sector":"Consumer goods",
          "Location":"Hyderabad",
          "Funding":"60,00,000",
          "Stage":"Seed",
          "Founder": "Daniel Ponto",
          "Pitch": "Hello, I'm Daniel Ponto, the founder of College Supply, a pioneering venture catering to the unique needs of college students. College Supply operates in the thriving market for student essentials, currently valued at $40 billion. In the past year, our company has experienced a substantial 200% increase in sales, showcasing the pressing demand for tailored solutions addressing the challenges faced by college students. Market trends underscore the vast potential for growth in this sector. The global enrollment in higher education is on a continuous rise, with a projected 10% increase over the next decade. As the student population grows, so does the need for convenient and specialized products and services. College Supply's data analytics reveal a 30% year-over-year increase in user engagement, signaling a strong and growing demand for our offerings. Furthermore, College Supply has strategically partnered with numerous educational institutions, resulting in a 150% expansion in our institutional collaborations within the last two years. This network allows us to offer exclusive and customized products directly aligned with the needs of students, fostering brand loyalty and recurring business. To capitalize on this momentum, we are seeking inr 60,00,000 in investment to scale our operations, enhance our digital infrastructure, and expand our product line. This investment opportunity is particularly attractive in Hyderabad, a thriving educational hub, where College Supply is positioned to dominate the market for student essentials. Join us in shaping the future of student living with College Supply - a strategic response to the evolving needs of the growing student demographic. Your investment in College Supply is an invitation to be part of a dynamic venture that's essential to the college experience and primed for substantial growth. Thank you for considering this exciting investment opportunity."
        }, 
        {
          "Video":"vid9",
          "Company": "Slap Wrap Straps",
          "Sector":"Fitness",
          "Location":"Bangalore",
          "Funding":"1,00,00,000",
          "Stage":"Seed",
          "Founder": "Keith Lamping",
          "Pitch": "Hello, I'm Keith Lamping, the proud owner of Slap Wrap Straps, a game-changing innovation designed to help users obtain their grip instantaneously through key auto-wrapping abilities. Slap Wrap Straps operates in the dynamic market of fitness and exercise accessories, currently valued at $5 billion and undergoing rapid growth. Over the past year, Slap Wrap Straps has achieved an impressive 200% increase in sales, establishing itself as a frontrunner in providing revolutionary solutions for fitness enthusiasts. Market trends underscore the vast potential for growth in our sector. The global demand for innovative and efficient fitness accessories has surged, with a projected 15% year-over-year increase. Our data analytics reveal a 30% increase in user satisfaction, emphasizing the strong and growing demand for Slap Wrap Straps' unique grip-enhancing technology. To capitalize on this momentum and solidify our position in the fitness accessory market, we are seeking inr 1,00,00,000 in investment. These funds will be utilized to scale production, expand our product line, and launch targeted marketing campaigns. This investment opportunity is particularly attractive in Bangalore, a fitness-focused region where users prioritize efficiency and innovation in their workout routines. Slap Wrap Straps isn't just an accessory; it's a revolution in grip technology. Your investment in Slap Wrap Straps is an invitation to be part of a dynamic venture that's reshaping the fitness accessory landscape. Thank you for considering this exciting investment opportunity."
        },
        
        {
          "Video":"vid1",
          "Company": "Scrub Daddy",
          "Sector":"Cleaning products",
          "Location":"Bangalore",
          "Funding":"5,00,00,000",
          "Stage":"Seed",
          "Founder": "Aaron Krause",
          "Pitch": "Hello, I'm Aaron Krause, the proud owner of Scrub Daddy, a household brand that's transforming the cleaning industry. In a market valued at $20 billion and growing steadily, Scrub Daddy has become a trailblazer with its patented smiley-faced scrubber made from FlexTexture material. Over the past year, Scrub Daddy has achieved a remarkable 300% increase in sales, positioning itself as a dominant force in the cleaning products sector. Market trends underscore the vast potential for growth in our sector. The global shift towards eco-friendly and reusable products is driving a 15% year-over-year increase in demand for sustainable cleaning solutions. Our data analytics reveal a 40% surge in user engagement, highlighting the essential role Scrub Daddy plays in meeting the evolving needs of environmentally conscious consumers. To seize this momentum and continue our success, we are seeking inr 5,00,00,000 in investment. These funds will be utilized to expand production capacity, advance research and development, and intensify our global marketing efforts. This investment opportunity is particularly attractive in Bangalore, a region known for its commitment to sustainability and green living. Scrub Daddy isn't just a sponge; it's a symbol of innovation, sustainability, and effective cleaning. Your investment in Scrub Daddy is an invitation to be part of a dynamic venture that's reshaping the cleaning products industry. Thank you for considering this exciting investment opportunity."
        },          
        {
          "Video":"vid3",
          "Company": "Ghia",
          "Sector":"Beverage",
          "Location":"Bangalore",
          "Funding":"50,00,000",
          "Stage":"Pre-Seed",
          "Founder": "Melanie Masarin",
          "Pitch": "Hello, I'm Melanie Masarin, the proud owner of Ghia, a leading brand in the burgeoning non-alcoholic beverage sector. Ghia operates in a market valued at $10 billion, and the demand for sophisticated, alcohol-free alternatives is on the rise. In the past year, Ghia has experienced a stellar 250% increase in sales, positioning itself as a trailblazer in the world of mindful drinking. Market trends underscore the tremendous potential for growth in our sector. The global wellness movement has fueled a 20% year-over-year increase in demand for functional and non-alcoholic beverages. Our data analytics reveal a 15% month-over-month increase in user engagement, highlighting the strong and growing demand for Ghia's herbal elixir. To capitalize on this momentum and further establish Ghia as a market leader, we are seeking inr 50,00,000 in investment. These funds will be directed towards scaling production, expanding distribution channels, and enhancing our marketing efforts. This investment opportunity is particularly attractive in Bangalore, a region known for its health-conscious consumer base and vibrant beverage culture. Ghia isn't just a beverage; it's a lifestyle choice that aligns with the values of the conscious consumer. Your investment in Ghia is an invitation to be part of a dynamic venture that's reshaping the future of mindful drinking. Thank you for considering this exciting investment opportunity."
        } 
  ];



function getVideoSource(videoName) {
    return fetch(`/get_video_source/${videoName}`)
        .then(response => response.json())
        .then(data => data.video_source);
}

document.querySelector(".shorts .shorts-wrap").innerHTML = shortVideosData.map(function(video, index){
    return `
        <div class ="video-wrapper">
            <div class="video">
                <video
                src= "/static/videos/${video.Video}.mp4"
                index= "${index}"
                onclick = "playpause(this)"
                autoplay="false"
                loop> </video>
                
            </div>
            <div class = "details">
            <h2> ${video.Company} </h2>
            <p> ${video.Founder}</p>
            </div>
        </div>
    
    `;

});
*/
let currentIndex = 0;

function playpause(ref) {
    if (ref.getAttribute("index") != currentIndex) {
        return;
    }

    if (ref.paused) {
        ref.play();

    }
    else {
        ref.pause()
    }
}

function pauseAllVideos() {
    try {
        // Select all video elements on the page
        let allVideos = document.querySelectorAll("video");

        // Iterate through each video and pause it
        allVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    } catch (error) {
        console.error("Error pausing all videos:", error);
    }
}


function setPlay(index) {
    try{
        let videos = document.querySelectorAll(".shorts .shorts-wrap .active");
        for (let i = 0;i < videos.length; i++) {
            videos[i].classList.remove("active");
            videos[i].classList.add("active");
        }    
    }
    catch (msg) {}
    pauseAllVideos();
    let videoWrapper = document.querySelector(".shorts .shorts-wrap .video-wrapper")[index];
    let video = videoWrapper.querySelector("video");
    videoWrapper.play();
    
}

var Sw = new Swipe(document.querySelector("#shorts"), {
    vertical: true,
    speed: 1000,
    startSlide: 0,
    draggable: true,
    autoRestart: false,
    continuous: true,
    disableScroll: true,
    stopPropagation: true,

    callback: function(index) {
        currentIndex = index;
        setPlay(index);
    }

});

let trackkingindex = 1
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
      Sw.next();
      trackkingindex = trackkingindex + 1;
      currentShort(currentIndex);
      console.log('Right arrow key pressed');
    } else if (event.key === 'ArrowLeft') {
      Sw.prev();
      trackkingindex = trackkingindex - 1;
      currentShort(trackkingindex);
      console.log('Left arrow key pressed');
    }
  });


  
