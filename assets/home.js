
    (()=>{
      const root=document.getElementById('wg-immersive');
      const page=document.scrollingElement;
const viewport=()=>({top:0,bottom:window.innerHeight});
      const assets={"01_hero":"assets/01_hero.webp","02_post":"assets/02_post.webp","03_live":"assets/03_live.webp","04_track":"assets/04_track.webp","05_results":"assets/05_results.webp","06_verified":"assets/06_verified.webp","07_showcase":"assets/07_showcase.webp","08_workers":"assets/08_workers.webp","09_paid":"assets/09_paid.webp","generic_hero":"assets/generic_hero.webp","generic_story":"assets/generic_story.webp","tutorial_bids":"assets/tutorial-bids.webp","tutorial_payment":"assets/tutorial-payment.webp"};
      root.querySelectorAll('[data-asset]').forEach(el=>{if(!el.getAttribute('src'))el.src=assets[el.dataset.asset]});
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
      const guides={
        customer:[
          ['Start with your job','Open Workgram and follow the customer journey. On the Jobs screen, choose “Post a job” to begin.','01_hero','Start on the Jobs screen','Choose the job-posting action. You can also explore Workers and Showcase from the home screen.'],
          ['Describe what you need','Enter the problem and details, check the location, add useful photos and choose a category. Add a budget if you want to, then review before posting.','02_post','Describe. Add photos. Post.','Add a clear description, useful photos, a location and a category. A budget is optional.'],
          ['Review the response','Once your job is live, review the offers you receive. Compare the scope, price and availability before deciding.','tutorial_bids','Compare the offers','Compare each offer’s price, availability and profile. This tutorial uses an edited example with €45 and €50 bids.'],
          ['Get to know the worker','Open the worker’s profile. Review their experience, verification information, portfolio and reviews. Use chat to clarify what is included.','06_verified','See the person behind the offer','Explore the worker’s portfolio, reviews and verification information before choosing.'],
          ['Choose and check the payment','Agree the work and timing. Check the total and any fees shown in the app before accepting and completing its payment steps.','tutorial_payment','Review before you pay','Check the selected worker, bid and platform fee. This example shows Sarah’s €50 bid plus a €5 fee: €55 total. Opening checkout does not confirm payment.'],
          ['Stay in touch','Use the conversation to arrange access and timing. When tracking is available for your accepted job, follow the worker’s progress.','04_track','From accepted to on the way','Arrange the details in chat, then follow the job’s progress when tracking is available.'],
          ['Check the result and review','Inspect the finished work before confirming completion. Leave an honest review. Use the available support or dispute process if something needs attention.','05_results','The result speaks for itself','Check the finished work and before-and-after photos. Leave a review that reflects your experience.']
        ],
        worker:[
          ['Build your profile','Add accurate skills, experience and service information. Complete the verification and payout setup requested in the app.','06_verified','Make a clear first impression','This is the public profile customers see. Keep your skills and experience accurate and your portfolio up to date.'],
          ['Show what you can do','Add your own project photos, useful descriptions and supported reels. Let customers see the work that is relevant to their job.','07_showcase','Let your work speak','Show your own projects with clear photos and reels so customers can explore your work.'],
          ['Find suitable local work','Review nearby jobs relevant to your skills. Check the description, location and photos before deciding whether to bid.','08_workers','Stay close to new opportunities','Job and message notifications help you stay informed. Check that a job suits your skills and location before bidding.'],
          ['Send a clear bid','State the proposed scope, price and availability. Make it clear what is included and what still needs to be agreed.','tutorial_bids','Make your offer clear','This customer-side example shows how your bid appears alongside other offers. Include your price, skills and availability.'],
          ['Follow the acceptance','Check your alerts for an accepted bid, then open the job conversation to agree access, materials and timing.','09_paid','Know when your bid is accepted','Follow your job alerts and check the job’s payment status before proceeding. An acceptance alert is not a payment receipt.'],
          ['Communicate and carry out the work','Keep the customer updated. Use the accepted-job workflow and on-the-way tracking where offered and appropriate.','04_track','Keep both sides in the loop','Keep access, timing and progress updates in the job conversation so both sides know what happens next.'],
          ['Complete the job and build reputation','Add the completion record required by the app and follow its confirmation and payout process. Keep your portfolio current as your work grows.','05_results','Turn completed work into proof','Record the finished work and follow the app’s confirmation process. A completion screen is not a payout receipt.']
        ]
      };
      let role='customer';let current=0;let timer=null;let programmaticUntil=0;
      const written=root.querySelector('#wg-written');
      const chapters=root.querySelector('#wg-chapters');
      const screen=root.querySelector('#wg-screen');
      const media=root.querySelector('#wg-tour-image');
      const missing=root.querySelector('#wg-missing');
      const play=root.querySelector('#wg-play');
      const caption=root.querySelector('#wg-caption');
      const pad=n=>String(n).padStart(2,'0');
      function stop(){if(timer){clearInterval(timer);timer=null}play.textContent='▶ Play tour';play.setAttribute('aria-label','Play tutorial');}
      function jumpTo(el){const top=el.getBoundingClientRect().top-viewport().top+page.scrollTop-99;window.scrollTo({top:Math.max(0,top),behavior:reduced.matches?'auto':'smooth'});}
      function setStep(i,move=false){
        current=Math.max(0,Math.min(guides[role].length-1,i));
        const row=guides[role][current];
        media.hidden=!row[2];missing.hidden=Boolean(row[2]);
        if(row[2]){media.src=assets[row[2]];media.alt='Workgram tutorial example: '+row[3]}else{media.removeAttribute('src');root.querySelector('#wg-missing-title').textContent=row[3]}
        screen.classList.toggle('wg-full-poster',row[2]==='07_showcase'||row[2]?.startsWith('tutorial_'));
        screen.classList.remove('wg-crossfade');void screen.offsetWidth;screen.classList.add('wg-crossfade');
        caption.textContent=(role==='customer'?'Customer':'Worker')+' · '+pad(current+1)+' / '+pad(guides[role].length)+' · '+row[3];
        [...chapters.children].forEach((node,index)=>{node.classList.toggle('wg-current',index===current);node.querySelector('button').setAttribute('aria-current',index===current?'step':'false')});
        root.querySelector('#wg-prev').disabled=current===0;
        root.querySelector('#wg-next').disabled=current===guides[role].length-1;
        if(move){programmaticUntil=Date.now()+1000;if(window.matchMedia('(min-width:581px)').matches){jumpTo(chapters.children[current])}else if(window.innerHeight>=760){const stage=root.querySelector('.wg-phone-stage');window.scrollTo({top:Math.max(0,chapters.children[current].getBoundingClientRect().top+page.scrollTop-stage.offsetHeight-90),behavior:reduced.matches?'auto':'smooth'});}else{jumpTo(root.querySelector('.wg-phone-stage'))}}
      }
      function renderRole(next){
        stop();role=next;written.replaceChildren();chapters.replaceChildren();
        root.querySelectorAll('[data-role]').forEach(button=>{const active=button.dataset.role===role;if(button.getAttribute('role')==='tab'){button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;}else button.setAttribute('aria-pressed',String(active));});
        root.querySelector('#wg-guide-panel').setAttribute('aria-labelledby','wg-tab-'+role);
        root.querySelector('#wg-hero-title').innerHTML=role==='customer'?'FIND LOCAL <em>WORKERS.</em><br>SEE THEIR WORK.':'FIND LOCAL <em>WORK.</em><br>BUILD YOUR REPUTATION.';
        root.querySelector('#wg-hero-copy').textContent=role==='customer'?'Find local skills. Explore portfolios. Choose who you hire.':'Show what you do. Discover nearby jobs. Let your work speak for itself.';
        root.querySelector('#wg-hero-cta').textContent=role==='customer'?'Post a job':'Join Workgram';
        guides[role].forEach((row,i)=>{
          const li=document.createElement('li');const number=document.createElement('span');number.className='wg-number';number.textContent=pad(i+1);const body=document.createElement('div');const title=document.createElement('h3');title.textContent=row[0];const copy=document.createElement('p');copy.textContent=row[1];body.append(title,copy);li.append(number,body);written.append(li);
          const section=document.createElement('article');section.className='wg-tour-chapter';section.id='wg-chapter-'+i;
          const label=document.createElement('div');label.className='wg-chapter-label';const count=document.createElement('span');count.textContent=pad(i+1);label.append(count,document.createTextNode(role+' journey'));
          const heading=document.createElement('h3');heading.textContent=row[3];const text=document.createElement('p');text.textContent=row[4];const button=document.createElement('button');button.type='button';button.className='wg-chapter-jump';button.textContent='Show this step →';button.addEventListener('click',()=>{stop();setStep(i,true)});
          section.append(label,heading,text,button);chapters.append(section);
        });setStep(0);programmaticUntil=Date.now()+800;
      }
      root.querySelectorAll('[data-role]').forEach(button=>{button.addEventListener('click',()=>renderRole(button.dataset.role));if(button.getAttribute('role')==='tab')button.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=(event.key==='Home')?'customer':(event.key==='End')?'worker':role==='customer'?'worker':'customer';renderRole(next);root.querySelector('#wg-tab-'+next).focus()}})});
      root.querySelectorAll('[data-goto]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();stop();programmaticUntil=Date.now()+1000;jumpTo(root.querySelector('#wg-'+button.dataset.goto));}));
      root.querySelector('#wg-prev').addEventListener('click',()=>{stop();setStep(current-1,true)});
      root.querySelector('#wg-next').addEventListener('click',()=>{stop();setStep(current+1,true)});
      root.querySelector('#wg-replay').addEventListener('click',()=>{stop();setStep(0,true)});
      play.addEventListener('click',()=>{if(timer){stop();return}if(current===guides[role].length-1)setStep(0,true);play.textContent='Ⅱ Pause tour';play.setAttribute('aria-label','Pause tutorial');timer=setInterval(()=>{if(!document.contains(root)){stop();return}if(current<guides[role].length-1)setStep(current+1,true);else stop()},6500)});
      window.addEventListener('wheel',()=>{if(timer)stop()},{passive:true});window.addEventListener('touchstart',()=>{if(timer)stop()},{passive:true});
      let ticking=false;
      function onScroll(){
        const max=page.scrollHeight-window.innerHeight;root.querySelector('.wg-progress').style.transform='scaleX('+(max>0?page.scrollTop/max:0)+')';
        if(Date.now()>programmaticUntil&&!timer&&(window.innerWidth>580||window.innerHeight>=760)){const view=viewport();const line=window.innerWidth>580?190:root.querySelector('.wg-phone-stage').getBoundingClientRect().bottom+24;let chosen=current;let nearest=Infinity;[...chapters.children].forEach((el,i)=>{const rect=el.getBoundingClientRect();const d=Math.abs(rect.top-line);if(rect.bottom>line-100&&rect.top<view.bottom-50&&d<nearest){nearest=d;chosen=i}});if(chosen!==current)setStep(chosen);}
        if(!reduced.matches){root.querySelectorAll('.wg-editorial img').forEach(image=>{const rect=image.parentElement.getBoundingClientRect();if(rect.bottom>0&&rect.top<window.innerHeight){const shift=Math.max(-9,Math.min(9,(window.innerHeight/2-rect.top-rect.height/2)*.035));image.style.transform='scale(1.08) translateY('+shift+'px)';}})}
        ticking=false;
      }
      window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
      if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('wg-enter');observer.unobserve(entry.target)}}),{threshold:.12});root.querySelectorAll('.wg-reveal').forEach(el=>observer.observe(el));}
      reduced.addEventListener('change',()=>{stop();root.querySelectorAll('.wg-editorial img').forEach(image=>image.style.transform='');});document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
      renderRole('customer');onScroll();
    })();
  
