---
title: Installation
group: Documents
category: Guides
---

# Installation Guide

## Welcome to the EXTREME Installation Experience™ (v2.2.7)

Thank you for choosing our software! This guide will walk you through the **intensely straightforward** process of installing our application. Put on your configuration helmet and prepare for an XML adventure like it's 2002!

## System Requirements

- A computer (preferably one that turns on)
- At least 256MB RAM (yes, MEGA bytes!)
- 50MB of free hard disk space (we know, it's massive)
- Internet Explorer 6.0 or Netscape Navigator 4.7
- Windows 98SE, ME, or the ultra-modern XP
- A CD-ROM drive for our exciting 3-disk installation set!

## Installation Steps

1. Insert Disk 1 into your CD-ROM drive
2. Wait for the autorun dialog (this could take up to 4 minutes)
3. Click "INSTALL NOW!!!" in the flashy animated GIF button
4. When prompted, create your `config.xml` file as follows:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<!DOCTYPE configuration SYSTEM "http://www.ourproduct.com/dtd/config-2002.dtd">
<CONFIGURATION>
  <APP_SETTINGS>
    <SERVER host="localhost" port="8080" timeout="30000" />
    <LOGGING level="ERROR" path="C:\Program Files\OurApp\Logs\" />
    <UI theme="BlueWave" showSplash="true" animationSpeed="slow" />
  </APP_SETTINGS>
  <USER_PREFERENCES>
    <OPTION name="AutoSave" value="true" />
    <OPTION name="CheckForUpdates" value="daily" />
    <OPTION name="PlayStartupSound" value="true" />
  </USER_PREFERENCES>
  <ADVANCED>
    <MEMORY initialHeapSize="64m" maxHeapSize="128m" />
    <PLUGINS enabled="true" scanOnStartup="true" />
  </ADVANCED>
</CONFIGURATION>
```

5. Insert Disk 2 when prompted
6. Configure your database settings and wait for the progress bar to complete (approximately 17 minutes)
7. When the "DLL Registration Success!" message appears, insert Disk 3
8. Print out your 16-digit registration code and keep it in a safe place!

## Troubleshooting

If you see the error message `ERROR: INSUFFICIENT SYSTEM RESOURCES`, try closing your other application.

If installation fails with `XML PARSING ERROR 0x8700542`, ensure you have copied EXACTLY 3 spaces (not tabs) before each XML element.

## Support

Need help? Contact our support team via:

- Email: help@ourcompany.com
- Fax: 555-XML-HELP
- BBS: dial-in available between 11pm-6am EST

Thank you for embarking on this installation journey! Remember to register your product within 30 days or face persistent popup reminders every 45 minutes!
