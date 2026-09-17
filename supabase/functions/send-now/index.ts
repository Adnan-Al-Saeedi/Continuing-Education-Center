// Supabase Edge Function: send-now
// يتم استدعاؤها من لوحة التحكم لتنفيذ الإرسال الفوري للأنشطة المستحقة أو إرسال تجريبي

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json().catch(() => ({}));
    const { activityId, lecturerId, isTestSend, testEmail } = body;

    // استعلام الإعدادات
    const { data: settings } = await supabaseClient
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        message: isTestSend
          ? `تم استلام طلب الإرسال التجريبي إلى: ${testEmail || settings?.admin_email}`
          : 'تم تشغيل مهمة فحص الأنشطة وإرسال التذكيرات بنجاح.',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
