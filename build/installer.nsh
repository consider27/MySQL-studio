!macro customInstall
  MessageBox MB_YESNO "Create a desktop shortcut for MySQL Studio?" IDYES createDesktopShortcut IDNO doneDesktopShortcut
  createDesktopShortcut:
    CreateShortCut "$DESKTOP\MySQL Studio.lnk" "$INSTDIR\MySQL Studio.exe"
  doneDesktopShortcut:
!macroend
