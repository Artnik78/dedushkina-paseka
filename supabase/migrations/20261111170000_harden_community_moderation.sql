-- Complete community moderation access controls in the test project.
-- Own-delete operations remain available to the author; moderator overrides
-- are restricted to approved journal moderators.

ALTER POLICY community_comments_delete_own ON public.community_comments
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
  );

ALTER POLICY community_posts_delete_own ON public.community_posts
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
  );

ALTER POLICY community_post_images_delete_own ON public.community_post_images
  USING (
    user_id = (SELECT auth.uid())
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
  );

ALTER POLICY community_post_images_moderator_delete ON public.community_post_images
  USING (
    EXISTS (SELECT 1 FROM public.journal_users ju
            WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id=(SELECT auth.uid()))
  );

-- Prevent signed URLs for attachments belonging to hidden posts from being
-- issued to ordinary members. The object path is the owner UUID followed by
-- the stored filename; metadata links it to its post.
ALTER POLICY community_storage_read_members ON storage.objects
  USING (
    bucket_id='community-images'
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
    AND EXISTS (
      SELECT 1
      FROM public.community_post_images i
      JOIN public.community_posts p ON p.id=i.post_id
      WHERE i.storage_path=name
        AND (p.is_hidden=false OR p.user_id=(SELECT auth.uid()))
    )
  );

ALTER POLICY community_storage_moderator_read ON storage.objects
  USING (
    bucket_id='community-images'
    AND EXISTS (SELECT 1 FROM public.journal_users ju
                WHERE ju.user_id=(SELECT auth.uid()) AND ju.allowed=true)
    AND EXISTS (SELECT 1 FROM public.community_moderators m
                WHERE m.user_id=(SELECT auth.uid()))
  );

-- A banned member cannot add new comments or images; already-created content
-- remains subject to normal author/moderator deletion controls.
