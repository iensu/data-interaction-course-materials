(setq project-path (file-name-directory (or (buffer-file-name) load-file-name))
      backup-directory-alist `(("." . ,(concat project-path ".backups")))
      publish-project-path (concat project-path "dist/")
      package-user-dir (concat project-path ".packages"))

(require 'org)
(require 'sh-script)
(require 'htmlize)
(require 'ox)
(require 'ox-html)
(require 'ox-publish)

(setq exclude-pattern "dist\\|.direnv\\|.packages\\|exercises\\|examples")
(setq org-html-validation-link nil
      org-html-html5-fancy t
      org-html-doctype "html5"
      org-html-htmlize-output-type 'css
      org-html-allow-name-attribute-in-anchors t
      org-html-head-include-default-style nil
      org-html-head-include-scripts nil
      org-html-head (cl-loop for style in '("base.css" "htmlize.css" "style-overrides.css")
                             collect (format "<link rel=\"stylesheet\" href=\"assets/%s\" />\n"
                                             style)
                             into styles
                             finally return (string-trim (apply #'concat styles)))

      org-publish-timestamp-directory "./.org-timestamps/"
      org-publish-project-alist
      `(("static"
         :base-directory ,project-path
         :base-extension "css\\|png\\|jpe?g\\|svg"
         :publishing-directory ,publish-project-path
         :publishing-function org-publish-attachment
         :exclude ,exclude-pattern
         :recursive t)

        ("org"
         :base-directory ,project-path
         :publishing-directory ,publish-project-path
         :publishing-function org-html-publish-to-html
         :base-extension "org"
         :exclude ,exclude-pattern
         :time-stamp-file nil)

        ("site" :components ("static" "org"))))

(org-publish-all :force)
