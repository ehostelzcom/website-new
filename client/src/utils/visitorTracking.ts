import axios from 'axios';

interface VisitorData {
  session_id: string;
  ip_address: string;
  country_name: string;
  country_code: string;
  region_name: string;
  city_name: string;
  city_id: number;
  latitude: number;
  longitude: number;
  isp_name: string;
  device_type: string;
  browser_name: string;
  browser_version: string;
  os_name: string;
  os_version: string;
  referrer_url: string;
  landing_page: string;
  current_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  screen_resolution: string;
  language: string;
  user_agent: string;
  is_unique_visitor: string;
}

function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
}

function isUniqueVisitor(): string {
  const hasVisited = localStorage.getItem('has_visited_ehostelz');
  if (!hasVisited) {
    localStorage.setItem('has_visited_ehostelz', 'true');
    return 'Y';
  }
  return 'N';
}

function getDeviceType(): string {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function getBrowserInfo(): { name: string; version: string } {
  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let browserVersion = 'Unknown';

  if (ua.includes('Firefox/')) {
    browserName = 'Firefox';
    browserVersion = ua.split('Firefox/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.includes('Edg/')) {
    browserName = 'Edge';
    browserVersion = ua.split('Edg/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.includes('Chrome/')) {
    browserName = 'Chrome';
    browserVersion = ua.split('Chrome/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    browserName = 'Safari';
    browserVersion = ua.split('Version/')[1]?.split(' ')[0] || 'Unknown';
  } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
    browserName = 'Internet Explorer';
    browserVersion = ua.includes('MSIE') 
      ? ua.split('MSIE ')[1]?.split(';')[0] || 'Unknown'
      : 'Unknown';
  }

  return { name: browserName, version: browserVersion };
}

function getOSInfo(): { name: string; version: string } {
  const ua = navigator.userAgent;
  let osName = 'Unknown';
  let osVersion = 'Unknown';

  if (ua.includes('Windows NT 10.0')) {
    osName = 'Windows';
    osVersion = '10';
  } else if (ua.includes('Windows NT 6.3')) {
    osName = 'Windows';
    osVersion = '8.1';
  } else if (ua.includes('Windows NT 6.2')) {
    osName = 'Windows';
    osVersion = '8';
  } else if (ua.includes('Windows NT 6.1')) {
    osName = 'Windows';
    osVersion = '7';
  } else if (ua.includes('Mac OS X')) {
    osName = 'macOS';
    const match = ua.match(/Mac OS X ([0-9_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (ua.includes('Android')) {
    osName = 'Android';
    const match = ua.match(/Android ([0-9.]+)/);
    osVersion = match ? match[1] : 'Unknown';
  } else if (ua.includes('iPhone') || ua.includes('iPad')) {
    osName = 'iOS';
    const match = ua.match(/OS ([0-9_]+)/);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (ua.includes('Linux')) {
    osName = 'Linux';
    osVersion = 'Unknown';
  }

  return { name: osName, version: osVersion };
}

function getUTMParameters(): { source: string; medium: string; campaign: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
  };
}

async function getIPAndLocation() {
  try {
    // Call our server endpoint which proxies to ipapi.co
    const response = await axios.get('/api/visitor-location');
    const data = response.data;
    
    return {
      ip_address: data.ip_address || 'Unknown',
      country_name: data.country_name || 'Unknown',
      country_code: data.country_code || 'Unknown',
      region_name: data.region_name || 'Unknown',
      city_name: data.city_name || 'Unknown',
      city_id: data.city_id || 0,
      latitude: data.latitude || 0,
      longitude: data.longitude || 0,
      isp_name: data.isp_name || 'Unknown',
    };
  } catch (error) {
    console.error('Failed to get IP location:', error);
    return {
      ip_address: 'Unknown',
      country_name: 'Unknown',
      country_code: 'Unknown',
      region_name: 'Unknown',
      city_name: 'Unknown',
      city_id: 0,
      latitude: 0,
      longitude: 0,
      isp_name: 'Unknown',
    };
  }
}

export async function trackVisitor() {
  try {
    // Get location data
    const locationData = await getIPAndLocation();
    
    // Get browser and OS info
    const browserInfo = getBrowserInfo();
    const osInfo = getOSInfo();
    const utmParams = getUTMParameters();
    
    // Get landing page from session storage (first page visited)
    let landingPage = sessionStorage.getItem('landing_page');
    if (!landingPage) {
      landingPage = window.location.pathname;
      sessionStorage.setItem('landing_page', landingPage);
    }
    
    const visitorData: VisitorData = {
      session_id: getSessionId(),
      ip_address: locationData.ip_address,
      country_name: locationData.country_name,
      country_code: locationData.country_code,
      region_name: locationData.region_name,
      city_name: locationData.city_name,
      city_id: locationData.city_id,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      isp_name: locationData.isp_name,
      device_type: getDeviceType(),
      browser_name: browserInfo.name,
      browser_version: browserInfo.version,
      os_name: osInfo.name,
      os_version: osInfo.version,
      referrer_url: document.referrer || 'Direct',
      landing_page: landingPage,
      current_page: window.location.pathname,
      utm_source: utmParams.source,
      utm_medium: utmParams.medium,
      utm_campaign: utmParams.campaign,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      user_agent: navigator.userAgent,
      is_unique_visitor: isUniqueVisitor(),
    };

    // Send data to our server endpoint which proxies to Oracle APEX
    await axios.post('/api/track-visitor', visitorData);

    console.log('Visitor tracked successfully');
  } catch (error) {
    console.error('Error tracking visitor:', error);
    // Fail silently - don't disrupt user experience
  }
}
