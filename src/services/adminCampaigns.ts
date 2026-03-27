import { getSupabaseClient } from '@/lib/supabase/client';
import type { CampaignCategory } from '@/types/domain';

interface CreateCampaignData {
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  category: CampaignCategory;
  ticketPrice: number;
  originalPrice?: number;
  totalTickets: number;
  badge?: string;
  drawDate: string;
  heroImage: File;
  galleryImages: File[];
}

async function uploadImage(file: File, campaignCode: string, folder: string): Promise<string> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${campaignCode}/${folder}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('campaigns')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error(`Erro ao fazer upload: ${uploadError.message}`);
  }

  const { data: urlData } = supabase.storage.from('campaigns').getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function createCampaign(data: CreateCampaignData): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  try {
    // Upload hero image
    const heroImageUrl = await uploadImage(data.heroImage, data.code, 'hero');

    // Upload gallery images
    const galleryUrls: string[] = [];
    for (const image of data.galleryImages) {
      const url = await uploadImage(image, data.code, 'gallery');
      galleryUrls.push(url);
    }

    // Create campaign record
    const { error: insertError } = await supabase.from('campaigns').insert({
      code: data.code,
      title: data.title,
      short_description: data.shortDescription,
      description: data.description,
      category: data.category,
      ticket_price: data.ticketPrice,
      original_price: data.originalPrice || null,
      total_tickets: data.totalTickets,
      sold_tickets: 0,
      hero_image: heroImageUrl,
      gallery: galleryUrls.length > 0 ? galleryUrls : [],
      badge: data.badge || null,
      draw_date: data.drawDate,
      status: 'active',
      featured: false,
    });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(`Erro ao criar campanha: ${insertError.message}`);
    }
  } catch (error) {
    console.error('Create campaign error:', error);
    throw error;
  }
}

export async function deleteCampaign(campaignId: string): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { error } = await supabase.from('campaigns').delete().eq('id', campaignId);

  if (error) {
    console.error('Delete error:', error);
    throw new Error(`Erro ao excluir campanha: ${error.message}`);
  }
}

export async function updateCampaignStatus(
  campaignId: string,
  status: 'draft' | 'active' | 'completed'
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase client not available');

  const { error } = await supabase
    .from('campaigns')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', campaignId);

  if (error) {
    console.error('Update error:', error);
    throw new Error(`Erro ao atualizar status: ${error.message}`);
  }
}
