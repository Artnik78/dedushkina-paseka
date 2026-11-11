-- Harden the journal community: approved journal members only, hidden content
-- visible only to its author and moderators. This migration is intended for
-- the production-upgrade branch and must be reviewed before production use.

-- Posts: require an approved journal account; hidden posts are private to
-- their author and community moderators.
ALTER POLICY community_posts_read_registered ON public.community_posts
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND (
      is_hidden = false
      OR user_id = (SELECT auth.uid())
      OR EXISTS (SELECT 1 FROM public.community_moderators m
                 WHERE m.user_id = (SELECT auth.uid()))
    )
  );

ALTER POLICY community_posts_insert_registered_unbanned ON public.community_posts
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
    AND char_length(btrim(title)) BETWEEN 4 AND 160
    AND char_length(btrim(body)) BETWEEN 1 AND 5000
  );

ALTER POLICY community_posts_update_own_unbanned ON public.community_posts
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  );

-- Comments: same membership gate and hidden-content rule.
ALTER POLICY community_comments_read_registered ON public.community_comments
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND (
      is_hidden = false
      OR user_id = (SELECT auth.uid())
      OR EXISTS (SELECT 1 FROM public.community_moderators m
                 WHERE m.user_id = (SELECT auth.uid()))
    )
  );

ALTER POLICY community_comments_insert_registered_unbanned ON public.community_comments
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
    AND EXISTS (SELECT 1 FROM public.community_posts p
                WHERE p.id = community_comments.post_id AND p.is_hidden = false)
    AND char_length(btrim(body)) BETWEEN 1 AND 3000
  );

ALTER POLICY community_comments_update_own_unbanned ON public.community_comments
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  );

-- Profiles are visible only to approved journal members.
ALTER POLICY community_profiles_read_registered ON public.community_profiles
  USING (EXISTS (SELECT 1 FROM public.journal_users ju
                 WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true));

ALTER POLICY community_profiles_insert_registered ON public.community_profiles
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_profiles_update_registered ON public.community_profiles
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  )
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  );

-- Reports: approved users may submit/read their own; moderators may review all.
ALTER POLICY community_reports_insert_own ON public.community_reports
  WITH CHECK (
    reporter_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  );

ALTER POLICY community_reports_read_own ON public.community_reports
  USING (
    reporter_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  );

ALTER POLICY community_reports_moderator_read ON public.community_reports
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_reports_moderator_update ON public.community_reports
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );

-- Moderator-only ban list and moderator roster.
ALTER POLICY community_bans_moderator_read ON public.community_bans
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_bans_moderator_insert ON public.community_bans
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_bans_moderator_delete ON public.community_bans
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_moderators_read_own ON public.community_moderators
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  );

-- Community image metadata and private Storage bucket: only approved members
-- may read; moderators may also inspect images attached to hidden posts.
ALTER POLICY community_post_images_read_members ON public.community_post_images
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_posts p
                WHERE p.id = community_post_images.post_id
                  AND (p.is_hidden = false
                       OR p.user_id = (SELECT auth.uid())
                       OR EXISTS (SELECT 1 FROM public.community_moderators m
                                  WHERE m.user_id = (SELECT auth.uid()))))
  );

ALTER POLICY community_post_images_insert_own ON public.community_post_images
  WITH CHECK (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
    AND EXISTS (SELECT 1 FROM public.community_posts p
                WHERE p.id = community_post_images.post_id
                  AND p.user_id = (SELECT auth.uid())
                  AND p.is_hidden = false)
  );

-- Private Storage object policies mirror the approved-member boundary.
ALTER POLICY community_storage_read_members ON storage.objects
  USING (
    bucket_id = 'community-images'
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  );

ALTER POLICY community_storage_insert_own ON storage.objects
  WITH CHECK (
    bucket_id = 'community-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND NOT EXISTS (SELECT 1 FROM public.community_bans b
                    WHERE b.user_id = (SELECT auth.uid()))
  );

ALTER POLICY community_storage_delete_own ON storage.objects
  USING (
    bucket_id = 'community-images'
    AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
  );

ALTER POLICY community_storage_moderator_read ON storage.objects
  USING (
    bucket_id = 'community-images'
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id = (SELECT auth.uid()) AND ju.allowed = true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id = (SELECT auth.uid()))
  );
